export class Env {
  public static getValue(key: string, required = true): string {
    const res = process.env[key];

    if (res) {
      return res;
    }

    if (required) {
      throw new Error(`${key} is not defined in environement variables`);
    }

    return "";
  }
}
