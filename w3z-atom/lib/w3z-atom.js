'use babel';

import W3zAtomView from './w3z-atom-view';
import { CompositeDisposable } from 'atom';

export default {

  w3zAtomView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.w3zAtomView = new W3zAtomView(state.w3zAtomViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.w3zAtomView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'w3z-atom:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.w3zAtomView.destroy();
  },

  serialize() {
    return {
      w3zAtomViewState: this.w3zAtomView.serialize()
    };
  },

  toggle() {
    console.log('W3zAtom was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
