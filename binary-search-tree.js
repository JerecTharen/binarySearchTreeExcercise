class BinarySearchTree {
  constructor() {
      this.root = null;
  }
  insert(data) {
    if(this.root === null){
        this.root = new TreeNode(data);
    }
    else{
        let currentNode = this.root;
        let done= false;
        let newNode = new TreeNode(data);
        while(!done){
            if(data.word > currentNode.data.word){
                if(currentNode.right === null){
                    currentNode.right = newNode;
                    done = true;
                }
                else{
                    currentNode = currentNode.right;
                }
            }
            else if(data.word < currentNode.data.word){
                if(currentNode.left === null){
                    currentNode.left = newNode;
                    done = true;
                }
                else{
                    currentNode = currentNode.left;
                }
            }
            else{
                done =true;
                console.log('They are equal. Data not stored');
            }
        }
    }
  }
  find(string) {
      let currentNode = this.root;
      let done =false;
      while(!done){
          if(string === currentNode.data.word){
              done = true;
              return currentNode.data;
          }
          else if(string > currentNode.data.word){
              if(currentNode.right === null){
                  done = true;
                  return 'string not found';
              }
              else{
                currentNode = currentNode.right;
              }
          }
          else if (string < currentNode.data.word){
              if(currentNode.left === null){
                  done = true;
                  return 'string not found';
              }
              else{
                currentNode = currentNode.left;
              }
          }
      }
  }
  remove(string) {
    let currentNode = this.root;
    let parentNode;
    let done = false;
    //if root is what's going to be deleted
      if(currentNode.data.word === string){
          if (this.root.left !== null){
              if(this.root.left.right !== null){
                  currentNode = currentNode.left;
                  while(!done){
                      if(currentNode.right === null){
                          done = true;
                          currentNode.right = this.root.right;
                      }
                      else{
                          currentNode = currentNode.right;
                      }
                  }
                  this.root = this.root.left;
              }
              else{
                this.root = this.root.left;
              }
          }
          else if (this.root.right !== null){
              this.root = this.root.right;
          }
          else{
              this.root = null;
          }
      }
      else{
          //needs to find what's going to be deleted
          currentNode = this.root;
          done = false;
          while(!done){
              //found on right
            if(currentNode.right.data.word === string){
                parentNode = currentNode;
                //if there is a value to the left of what we want to delete
                if(currentNode.right.left !== null){
                    currentNode = currentNode.right.left;
                    let stop = false;
                    while(!stop){
                        if (currentNode.right === null){
                            stop = true;
                            currentNode.right = parentNode.right.right;
                            done =true;
                        }
                        else{
                            currentNode = currentNode.right;
                        }
                    }
                    parentNode.right = parentNode.right.left;
                    done = true;
                }
                //if there is not a value to the left of what we want to delete
                else{
                    parentNode.right = parentNode.right.right;
                    done = true;
                }
            }
            //found on left
            else if(currentNode.left.data.word === string){
                parentNode = currentNode;
                //if there is a value to the left of what we want to delete
                if(currentNode.left.left !== null){
                    currentNode = currentNode.left.left;
                    let stop = false;
                    while(!stop){
                        if (currentNode.right === null){
                            stop = true;
                            currentNode.right = parentNode.left.right;
                            done = true;
                        }
                        else{
                            currentNode = currentNode.right;
                        }
                    }
                    parentNode.left = parentNode.left.left;
                    done = true;
                }
                //if there is not a value to the left of what we want to delete
                else{
                    parentNode.left = parentNode.left.left;
                    done = true;
                }
            }
            else{
                //move to right
                if(currentNode.data.word < string){
                    if(currentNode !== null){
                        currentNode = currentNode.right;
                    }
                    else{
                        done = true;
                        console.log('value does not exist');
                    }
                }
                //move to left
                else if(currentNode.data.word > string){
                    if(currentNode !== null){
                        currentNode = currentNode.left;
                    }
                    else{
                        done = true;
                        console.log('value does not exist');
                    }
                }
            }
          }
      }
  }
  min() {}
  max() {}
  toString() {
      let result = '';
      let currentNode = this.root;
      function recursive(node){
          if (node.right === null && node.left === null){
              return `Word: ${node.data.word} Definition: ${node.data.definition}`;
          }
          else{
              if (node.right !== null && node.left !== null){
                return `Word: ${node.data.word} Definition: ${node.data.definition} left: (${recursive(node.left)}) right: (${recursive(node.right)})`;
              }
              else if (node.right !== null){
                  return `Word: ${node.data.word} Definition: ${node.data.definition} left: None right: (${recursive(node.right)})`;
              }
              else if(node.left != null){
                  return `Word: ${node.data.word} Definition: ${node.data.definition} left: (${recursive(node.left)}) right: None`;
              }
          }
      }
      result += recursive(currentNode);
      return result;
  }
}

class TreeNode {
    constructor(data){
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

// module.exports = BinarySearchTree;

function tester(data,testData){
    if(data === testData){
        console.log('Test Passed');
    }
    else{
        console.log('Test Failed');
    }
}

let myTree = new BinarySearchTree();

myTree.insert({word:'jog',definition: 'run at a steady gentle pace'});
myTree.insert({word:'apple',definition: 'the round fruit of a tree' });
myTree.insert({word:'port',definition:'harbor'});
myTree.insert({word:'random',definition: 'sdfdsdsf'});
myTree.insert({word:'a',definition:'dlfksjddkfls'});
myTree.insert({word:'b',definition:'sldkfjslk'});
// tester(myTree.root.data.word,'jog');
// console.log(myTree);
// tester(myTree.root.left.data.word,'apple');