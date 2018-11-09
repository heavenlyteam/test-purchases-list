import request from './request';

export default class ItemAPI {

  static async getItems() {
    const result = await request.get('items');
    return result.data;
  }

  static async removeItem(id) {
    const result = await request.delete(`items/${id}`);
    return !!result.data;
  }

  static async updateItem(item) {
    const param = new URLSearchParams();
    param.append('id', item.id);
    param.append('name', item.name);
    param.append('description', item.name);
    await request.put('items', param)
  }

  static async createItem(item) {
    const param = new URLSearchParams();
    param.append('name', item.name);
    param.append('description', item.name);
    await request.post('items', param)
  };
}
