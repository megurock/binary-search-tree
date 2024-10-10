export default class Node<T> {
  constructor(
    public value: T,
    public left: Node<T> | null = null,
    public right: Node<T> | null = null
  ) {}

  public isLeaf() {
    return this.left === null && this.right === null
  }
}
