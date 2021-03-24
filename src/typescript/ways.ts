function createa<T>(length: number, value: T): Array<T> {
  let result: T[] = [];
  return result;
}

// 有关联的地方都改成 <T>
function createArray<T>(length: number, value: T): Array<T> {
  let result: T[] = [];
  for (let i = 0; i < length; i++) {
    result[i] = value;
  }
  return result;
}

createArray(3, "1");

interface User{
    id: number
    name: string
    age: number
}

let str: Exclude<keyof User, 'id'> = 'age'


type Love = Omit<User, 'id'>