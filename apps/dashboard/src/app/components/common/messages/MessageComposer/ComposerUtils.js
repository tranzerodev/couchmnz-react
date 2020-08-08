import {EditorState, AtomicBlockUtils, SelectionState, Modifier, convertToRaw, convertFromRaw, ContentState} from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

import AttachmentBlockView from './AttachmentBlockView';

const FILE_UPLOAD_ENTITY_TYPE = 'FILE_ATTACHMENT';
const FILE_UPLOAD_BLOCK_TYPE = 'atomic';

export const fileAttachmentBlockRenderer = (editorState, contentBlock, onDeleteFunc) => {
  const type = contentBlock.getType();
  if (type === FILE_UPLOAD_BLOCK_TYPE) {
    const contentState = editorState.getCurrentContent();
    const entity = contentState.getEntity(contentBlock.getEntityAt(0));
    if ((entity !== null) && entity.type === FILE_UPLOAD_ENTITY_TYPE) {
      const {id, name, url, size} = entity.data;
      return {
        component: AttachmentBlockView,
        editable: false,
        props: {
          id,
          name,
          size,
          url,
          onDelete: onDeleteFunc
        }
      };
    }
  }
};

export const insertFileAttachment = (editorState, {name, url, size, id}) => {
  const contentState = editorState.getCurrentContent();
  const contentStateWithEntity = contentState.createEntity(
    FILE_UPLOAD_ENTITY_TYPE,
    'IMMUTABLE',
    {
      id,
      url,
      name,
      size
    },
  );
  const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
  const newEditorState = EditorState.set(
    editorState,
    {currentContent: contentStateWithEntity},
  );
  const finalState = AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, ' ');
  return finalState;
};

export const deleteFileAttachment = (editorState, blockKey) => {
  const content = editorState.getCurrentContent();
  const block = content.getBlockForKey(blockKey);
  const targetRange = new SelectionState({
    anchorKey: blockKey,
    anchorOffset: 0,
    focusKey: blockKey,
    focusOffset: block.getLength()
  });

  const withoutTeX = Modifier.removeRange(content, targetRange, 'backward');
  const resetBlock = Modifier.setBlockType(
    withoutTeX,
    withoutTeX.getSelectionAfter(),
    'unstyled',
  );

  const newState = EditorState.push(editorState, resetBlock, 'remove-range');
  const finalState = EditorState.forceSelection(newState, resetBlock.getSelectionAfter());
  return finalState;
};

const convertAttachmentBlockViewToHtml = ({type, data}) => {
  if (type === FILE_UPLOAD_ENTITY_TYPE) {
    return `<a href="${data.url}" target="_blank">${data.name} ${data.size}KB</a>`;
  }
};

export const getRawContent = editorState => {
  return convertToRaw(editorState.getCurrentContent());
};

export const convertToEditorState = rawContent => {
  const contentState = convertFromRaw(rawContent);
  return EditorState.createWithContent(contentState);
};

export const convertToHtml = editorState => {
  const rawContent = getRawContent(editorState);
  const htmlConverted = draftToHtml(rawContent, null, null, convertAttachmentBlockViewToHtml);
  return htmlConverted;
};
export const convertFromHtml = htmlString => {
  if (htmlString) {
    const processedHtmlString = htmlString.replace(/(&nbsp;)/g, '');
    const blocksFromHtml = htmlToDraft(processedHtmlString);
    const {contentBlocks, entityMap} = blocksFromHtml;
    const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
    const editorState = EditorState.createWithContent(contentState);
    return editorState;
  }
  return EditorState.createEmpty();
};
