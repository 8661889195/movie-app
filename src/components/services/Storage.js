export default class AppStorage {
  _storeKey
  _storage

  constructor(key, storage) {
    this._storeKey = key
    this._storage = storage
  }

  getItems() {
    const items = this._storage.getItem(this._storeKey)

    if (items) return JSON.parse(items)
    else return []
  }

  setItems(items) {
    this._storage.setItem(this._storeKey, JSON.stringify(items))
  }

  removeItems() {
    this._storage.clear()
  }
}