export type FallbackProps = {
  error: Error;
  reset: () => void;
};

const DefaultFallback = ({ reset, error }: FallbackProps) => {
  return (
    <section role="alert">
      <h1>Непредвиденная ошибка:</h1>
      <button type="reset" onClick={reset}>
        <p>Перезагрузить</p>
      </button>
      <code>{error.toString()}</code>
      <code>{JSON.stringify(error, null, 2)}</code>
    </section>
  );
};

export default DefaultFallback;
