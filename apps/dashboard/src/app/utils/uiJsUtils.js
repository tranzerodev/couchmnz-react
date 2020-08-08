
function outerHeight(el) {
  let height = el.offsetHeight;
  const style = getComputedStyle(el);
  const radixParam = 10; // For decimal
  height += parseInt(style.marginTop, radixParam) + parseInt(style.marginBottom, radixParam);
  return height;
}

function getFirstElementByClassName(className) {
  return document.getElementsByClassName(className)[0];
}

const CLASSNAME_MESSAGE_OPEN = 'message--open';

export function setMessageDetailPane() {
  const windowWidth = window.innerWidth;
  const {body} = document;
  if (windowWidth < 961) {
    const eleMessageDetailToolbar = getFirstElementByClassName('msg_messagesDetail-toolBar');
    const eleMessageDetailSubject = getFirstElementByClassName('msg_messagesDetail-subject');
    if ((eleMessageDetailToolbar) && (eleMessageDetailSubject)) {
      body.classList.add(CLASSNAME_MESSAGE_OPEN);
      const paddingValue = outerHeight(eleMessageDetailToolbar) + outerHeight(eleMessageDetailSubject);
      const eleMessagesDetail = getFirstElementByClassName('msg_messagesDetail');
      eleMessagesDetail.style.paddingTop = `${paddingValue}px`;
    }
  } else {
    body.classList.remove(CLASSNAME_MESSAGE_OPEN);
  }
}

function hide(element) {
  if (element) {
    if (element.style) {
      element.style.display = 'none';
    }
  }
}

function show(element) {
  if (element) {
    if (element.style) {
      element.style.display = '';
    }
  }
}

export function closeMessageDetailsPane() {
  document.body.classList.remove(CLASSNAME_MESSAGE_OPEN);
}

window.addEventListener('resize', () => {
  setMessageDetailPane();
});

export function openFiltersPanelOnMobile() {
  const msgSideBarTrainerDropDown = getFirstElementByClassName('msg_sidebar-trainerDropdown');
  console.log(msgSideBarTrainerDropDown);
  if (msgSideBarTrainerDropDown) {
    msgSideBarTrainerDropDown.classList.remove('uk-open');
  }
  const msgSidebarNav = getFirstElementByClassName('msg_sidebar-nav');
  if (msgSidebarNav) {
    hide(msgSidebarNav);
  }
  const messageActions = getFirstElementByClassName('msg_messageActions');
  if (messageActions) {
    messageActions.classList.toggle('msg_messageActions--mobile');
    messageActions.style.display = 'block';
  }
}

export function closeFiltersPanelOnMobile() {
  const msgSidebarNav = getFirstElementByClassName('msg_sidebar-nav');
  if (msgSidebarNav) {
    show(msgSidebarNav);
  }
  const messageActions = getFirstElementByClassName('msg_messageActions');
  if (messageActions) {
    messageActions.classList.toggle('msg_messageActions--mobile');
    hide(messageActions);
  }
}

export function toggleMessageSideNavMobile(event) {
  const {currentTarget} = event;
  const msgSidebarNav = getFirstElementByClassName('msg_sidebar-nav');
  if (msgSidebarNav) {
    const msgSidebarNavOuterWidth = msgSidebarNav.offsetWidth;
    const currentTargetWidth = currentTarget.offsetWidth;
    const currentTargetLeft = currentTarget.offsetLeft;
    const currentTargetHeight = currentTarget.offsetHeight;

    const posLeft = currentTargetLeft - ((msgSidebarNavOuterWidth - currentTargetWidth) / 2);
    const posTop = (2 * currentTargetHeight) + 10;

    msgSidebarNav.style.left = `${posLeft}px`;
    msgSidebarNav.style.top = `${posTop}px`;

    const msgSidebarNavDisplay = msgSidebarNav.style.display;
    if (msgSidebarNavDisplay === 'none') {
      msgSidebarNav.style.display = 'block';
    } else {
      msgSidebarNav.style.display = 'none';
    }
  }
  const msgSidebarTrainerDropDown = getFirstElementByClassName('msg_sidebar-trainerDropdown');
  if (msgSidebarTrainerDropDown) {
    msgSidebarTrainerDropDown.classList.remove('uk-open');
  }
}

