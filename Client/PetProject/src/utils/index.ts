export function timeConverter(UNIX_timestamp?: number) {
  var a = new Date(UNIX_timestamp * 1000);
  var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;
  return time;
}

export function formatTimeAgo(timestampInSeconds?: number) {
  const now = new Date();
  const timestamp = new Date(timestampInSeconds * 1000); // Convert seconds to milliseconds

  const secondsPast: any = (now.getTime() - timestamp.getTime()) / 1000;

  if (secondsPast < 60) {
    return parseInt(secondsPast) + ' seconds ago';
  } else if (secondsPast < 3600) {
    return parseInt(secondsPast / 60) + ' minutes ago';
  } else if (secondsPast <= 86400) {
    return parseInt(secondsPast / 3600) + ' hours ago';
  } else if (secondsPast <= 2592000) {
    return parseInt(secondsPast / 86400) + ' days ago';
  } else if (secondsPast <= 31536000) {
    return parseInt(secondsPast / 2592000) + ' months ago';
  } else {
    return parseInt(secondsPast / 31536000) + ' years ago';
  }
}
