export function getErrorMessage(err: unknown) {
  if (hasMessageProperty(err)) {
    return err.message;
  }
  return String(err);
}

function hasMessageProperty(err: unknown): err is { message: string } {
  return typeof err === "object" && err !== null && "message" in err
    && typeof (err as { message: string }).message === "string";
}
