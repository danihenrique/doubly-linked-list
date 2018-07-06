const { expect } = require('chai');
const doublyLinkedList = require('./index');

describe('doublyLinkedList tests', () => {
  const dll = doublyLinkedList();

  describe('.addFirst(value)', () =>
    it('should add a node at the beginning of the list', () => {
      dll.addFirst('test 1');
      dll.addFirst('test 2');
    }));

  describe('.addLast(value)', () =>
    it('should add a node to the end of the list', () => {
      dll.addLast('test 3');
      dll.addLast('test 4');
    }));

  describe('.addAfter(value, newValue)', () => {
    it('should add a node after a specific value', () => {
      dll.addAfter('test 2', 'test 5');
      dll.addAfter('test 3', 'test 6');
    });

    it('should throw an error when value node does not exist', () =>
      expect(() => dll.addAfter('n123', 'test123'))
        .to.throw(Error).and.to.have
        .property('message', 'node n123 not found'));
  });

  describe('.addBefore(value, newValue)', () => {
    it('should add a node after a specific value', () => {
      dll.addBefore('test 5', 'test 7');
      dll.addBefore('test 2', 'test 8');
    });

    it('should throw an error when value node does not exist', () =>
      expect(() => dll.addBefore('n123', 'test123'))
        .to.throw(Error)
        .and.to.have.property('message', 'node n123 not found'));
  });

  describe('.count()', () =>
    it('should get the count of nodes in the list', () =>
      expect(dll.count()).to.equal(8)));

  describe('.head()', () =>
    it('should get the head node', () =>
      expect(dll.head().getValue()).to.equal('test 8')));

  describe('.tail()', () =>
    it('should get the head node', () =>
      expect(dll.tail().getValue()).to.equal('test 4')));

  describe('.toArray()', () =>
    it('should convert the linkedList to array in same order', () => {
      expect(dll.toArray()).to.deep.equal([
        'test 8',
        'test 2',
        'test 7',
        'test 5',
        'test 1',
        'test 3',
        'test 6',
        'test 4'
      ]);
    }));

  describe('.traverse(cb)', () =>
    it('should traverse the linked list', () => {
      const values = [];
      dll.traverse(v => values.push(v.getValue()));
      expect(values).to.deep.equal([
        'test 8',
        'test 2',
        'test 7',
        'test 5',
        'test 1',
        'test 3',
        'test 6',
        'test 4'
      ]);
    }));


  describe('.traverseBackward(cb)', () =>
    it('should traverse the linked list', () => {
      const values = [];
      dll.traverseBackward(v => values.push(v.getValue()));
      expect(values).to.deep.equal([
        'test 4',
        'test 6',
        'test 3',
        'test 1',
        'test 5',
        'test 7',
        'test 2',
        'test 8'
      ]);
    }));

  describe('.find(value)', () => {
    it('should find a nodes', () => {
      const n = dll.find('test 5');
      expect(n.getValue()).to.equal('test 5');
      expect(n.getNext().getValue()).to.equal('test 1');
      expect(n.getPrev().getValue()).to.equal('test 7');
    });

    it('should return null when a node not found', () =>
      expect(dll.find('not found')).to.equal(null));
  });

  describe('.removeFirst()', () =>
    it('should remove the first node', () => {
      dll.removeFirst();
      expect(dll.count()).to.equal(7);
      expect(dll.head().getValue()).to.equal('test 2');
    }));

  describe('.removeLast()', () =>
    it('should remove the last node', () => {
      dll.removeLast();
      expect(dll.count()).to.equal(6);
      expect(dll.find('test 4')).to.equal(null);
    }));

  describe('.remove(value)', () =>
    it('should remove a node', () => {
      dll.remove('test 5');
      expect(dll.count()).to.equal(5);
      expect(dll.find('test 5')).to.equal(null);
    }));

  describe('.clear()', () =>
    it('should clear the linked list', () => {
      dll.clear();
      expect(dll.count()).to.equal(0);
      expect(dll.head()).to.equal(null);
      expect(dll.tail()).to.equal(null);
    }));
});
