class StatusHelper {
  static getDescription(status: string | undefined): string {
    switch (status) {
      case '200':
        return 'Successful operation';
      case '201':
        return 'Successful operation; no content';
      case '400':
        return 'Bad request. Malformed query or request data';
      case '401':
        return 'Unauthorized request. Authentication headers or query parameters are not present in request';
      case '404':
        return 'Requested resource not found';
      case '500':
        return "Server error. Not your fault, this shouldn't happen!";
      default:
        return '';
    }
  }
}

export default StatusHelper;
