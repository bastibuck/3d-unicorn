const useDebug = () => {
  return {
    enabled: getHash(),
  };
};

const getHash = () =>
  typeof window !== "undefined"
    ? decodeURIComponent(window.location.hash) === "#debug"
    : false;

export default useDebug;
