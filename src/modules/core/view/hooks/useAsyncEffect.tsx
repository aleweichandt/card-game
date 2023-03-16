import {DependencyList, useEffect} from "react";
const useAsyncEffect = (
  fn: () => Promise<void>,
  deps: DependencyList
) => {
  useEffect(() => {
    fn()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}

export default useAsyncEffect
