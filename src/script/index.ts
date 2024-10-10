import BinarySearchTree, { type CompareFunction } from './bst/BinarySearchTree.js'
import type { Record } from './types'

class Main {
  private bst: BinarySearchTree<Record> | null = null
  private records: Record[] = []

  constructor() {
    const searchButton = document.querySelector('#searchButton')
    const deleteButton = document.querySelector('#deleteButton')
    const compare = (a: Record, b: Record) => a.id.localeCompare(b.id)
    this.fetchRecords('/js/data/dummy.json').then((records) => {
      this.records = records
      this.bst = this.createBST(records, compare)
      searchButton?.removeAttribute('disabled')
      searchButton?.addEventListener('click', this.search.bind(this))
      deleteButton?.removeAttribute('disabled')
      deleteButton?.addEventListener('click', this.delete.bind(this))
    })
  }

  private delete() {
    const record = this.records[Math.floor(Math.random() * this.records.length)]
    const start1 = performance.now()
    this.bst?.delete(record)
    const time1 = performance.now() - start1

    const start2 = performance.now()
    this.records = this.records.filter(({ id }) => id !== record.id)
    const time2 = performance.now() - start2

    const output = document.querySelector('#output')
    if (output)
      output.innerHTML = `[Delete]<br>Binary search: ${time1} ms<br>Linear search: ${time2} ms`
  }

  private search() {
    const record = this.records[Math.floor(Math.random() * this.records.length)]
    const start1 = performance.now()
    this.binarySearch(record)
    const time1 = performance.now() - start1

    const start2 = performance.now()
    this.linearSearch(record)
    const time2 = performance.now() - start2

    const output = document.querySelector('#output')
    if (output)
      output.innerHTML = `[Find]<br>Binary search: ${time1} ms<br>Linear search: ${time2} ms`
  }

  private async fetchRecords(url: string): Promise<Record[]> {
    const result = await fetch(url)
    if (result.status == 200) {
      const records = await result.json()
      return records
    }
    return []
  }

  private createBST(records: Record[], compare: CompareFunction<Record>) {
    const rootValue = this.records[0] as Record
    const tree = new BinarySearchTree<Record>(rootValue, compare)
    records.forEach((record) => tree.add(record))
    return tree
  }

  private binarySearch(record: Record) {
    return this.bst?.findOne(record)
  }

  // Find a random record using linear search
  private linearSearch(record: Record) {
    return this.records.find(({ id }) => id === record.id)
  }
}

new Main()
