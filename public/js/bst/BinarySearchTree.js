import Node from './Node.js';
export default class BinarySearchTree {
    root;
    compare;
    // Create a new binary search tree with a root value and a comparison function
    constructor(value, compare) {
        this.root = new Node(value);
        this.compare = compare;
    }
    // Add a value to the binary search tree
    add(value) {
        this.insert(value, this.root);
    }
    // Insert a value into the binary search tree
    insert(value, node) {
        // If the value is less than the current node's value
        if (this.compare(value, node.value) < 0) {
            if (node.left === null)
                node.left = new Node(value);
            else
                this.insert(value, node.left);
        }
        // If the value is greater than or equal to the current node's value
        else {
            if (node.right === null)
                node.right = new Node(value);
            else
                this.insert(value, node.right);
        }
    }
    findOne(value, node = this.root) {
        if (node === null)
            return null;
        if (this.compare(value, node.value) === 0)
            return node;
        if (this.compare(value, node.value) < 0)
            return this.findOne(value, node.left);
        if (this.compare(value, node.value) > 0)
            return this.findOne(value, node.right);
        return null;
    }
    // Delete a node by value
    delete(value, node = this.root) {
        if (node === null)
            return null;
        // Find the node to delete
        if (this.compare(value, node.value) < 0) {
            node.left = this.delete(value, node.left);
            return node;
        }
        else if (this.compare(value, node.value) > 0) {
            node.right = this.delete(value, node.right);
            return node;
        }
        else {
            // Case 1: No children (leaf node)
            if (node.isLeaf())
                return null;
            // Case 2: One child
            if (node.left === null)
                return node.right;
            else if (node.right === null)
                return node.left;
            // Case 3: Two children
            const minLargerNode = this.findMin(node.right);
            node.value = minLargerNode.value;
            node.right = this.delete(minLargerNode.value, node.right);
            return node;
        }
    }
    // Find the minimum value node in a subtree
    findMin(node) {
        while (node.left !== null)
            node = node.left;
        return node;
    }
}
