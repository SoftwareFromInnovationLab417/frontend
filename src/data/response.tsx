export class Resp<T> {
  code: number;
  success: boolean;
  message: string;
  data: T;

  constructor(code: number, success: boolean, message: string, data: T) {
    this.code = code;
    this.success = success;
    this.message = message;
    this.data = data;
  }
}