class CodeFormatter {
  static toJson(toSerialize: any): string {
    const seen: any[] = [];

    return JSON.stringify(
      toSerialize,
      (key, val) => {
        if (val != null && typeof val === 'object') {
          if (seen.indexOf(val) >= 0) {
            return;
          }
          seen.push(val);
        }
        return val;
      },
      2
    );
  }
}

export default CodeFormatter;
