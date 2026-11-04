export function getDifferences(arr1, arr2) {
  const copyArr1 = [...arr1];
  const copyArr2 = [...arr2];

  for (let i = 0; i < copyArr1.length; i++) {
    if (copyArr2.includes(copyArr1[i])) {
      copyArr2.splice(copyArr2.indexOf(copyArr1[i]), 1);
      copyArr1.splice(i--, 1);
    }
  }

  return copyArr1;
}
