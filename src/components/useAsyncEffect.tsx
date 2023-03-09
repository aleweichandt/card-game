import {DependencyList, useEffect} from "react";
const useAsyncEffect = (
  fn: () => Promise<void>,
  deps: DependencyList
) => {
  useEffect(() => {
    fn()
  }, deps)
}

export default useAsyncEffect
