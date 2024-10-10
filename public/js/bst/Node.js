export default class Node {
    value;
    left;
    right;
    constructor(value, left = null, right = null) {
        this.value = value;
        this.left = left;
        this.right = right;
    }
    isLeaf() {
        return this.left === null && this.right === null;
    }
}
