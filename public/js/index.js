import BinarySearchTree from './bst/BinarySearchTree.js';
class Main {
    bst = null;
    records = [];
    constructor() {
        const searchButton = document.querySelector('#searchButton');
        const deleteButton = document.querySelector('#deleteButton');
        const compare = (a, b) => a.id.localeCompare(b.id);
        this.fetchRecords('/js/data/dummy.json').then((records) => {
            this.records = records;
            this.bst = this.createBST(records, compare);
            searchButton?.removeAttribute('disabled');
            searchButton?.addEventListener('click', this.search.bind(this));
            deleteButton?.removeAttribute('disabled');
            deleteButton?.addEventListener('click', this.delete.bind(this));
        });
    }
    delete() {
        const record = this.records[Math.floor(Math.random() * this.records.length)];
        const start1 = performance.now();
        this.bst?.delete(record);
        const time1 = performance.now() - start1;
        const start2 = performance.now();
        this.records = this.records.filter(({ id }) => id !== record.id);
        const time2 = performance.now() - start2;
        const output = document.querySelector('#output');
        if (output)
            output.innerHTML = `[Delete]<br>Binary search: ${time1} ms<br>Linear search: ${time2} ms`;
    }
    search() {
        const record = this.records[Math.floor(Math.random() * this.records.length)];
        const start1 = performance.now();
        this.binarySearch(record);
        const time1 = performance.now() - start1;
        const start2 = performance.now();
        this.linearSearch(record);
        const time2 = performance.now() - start2;
        const output = document.querySelector('#output');
        if (output)
            output.innerHTML = `[Find]<br>Binary search: ${time1} ms<br>Linear search: ${time2} ms`;
    }
    async fetchRecords(url) {
        const result = await fetch(url);
        if (result.status == 200) {
            const records = await result.json();
            return records;
        }
        return [];
    }
    createBST(records, compare) {
        const rootValue = this.records[0];
        const tree = new BinarySearchTree(rootValue, compare);
        records.forEach((record) => tree.add(record));
        return tree;
    }
    binarySearch(record) {
        return this.bst?.findOne(record);
    }
    // Find a random record using linear search
    linearSearch(record) {
        return this.records.find(({ id }) => id === record.id);
    }
}
new Main();
