/**
 * - You can set your documentation here
 * @param {Array <{item:string}> } array
 * -Comment param here
 * @param {number} x
 * @return {Promise.<Array<{item:{key:number,provider:string}>>}
 */
const exempleAnnotation = (array, x) =>
  new Promise((resolve, reject) => {
    if (x === 0) {
      reject(new Error('bad x'));
    }
    setTimeout(() => {
      const arr = [
        { item: { key: 1, provider: array[1].item } },
        { item: { key: 2, provider: array[2].item } }
      ];
      resolve(arr);
    }, 2000);
  });

export default exempleAnnotation;
