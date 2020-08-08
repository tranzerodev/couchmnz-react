export default function validate({reasonId, sessions}) {
  return reasonId && sessions.length;
}
