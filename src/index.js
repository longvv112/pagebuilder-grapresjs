import "grapesjs/dist/css/grapes.min.css";
import "./styles.css";
import grapesjs from "grapesjs";

const editor = grapesjs.init({
  // Indicate where to init the editor. You can also pass an HTMLElement
  container: "#gjs",
  // Get the content for the canvas directly from the element
  // As an alternative we could use: `components: '<h1>Hello World Component!</h1>'`,
  fromElement: true,
  // Size of the editor
  // height: '300px',
  // width: 'auto',
  // Disable the storage manager for the moment
  // storageManager: false,
  // Avoid any default panel
  panels: { defaults: [] },
  blockManager: {
    appendTo: "#blocks",
    blocks: [
      {
        id: "text",
        label: "Text",
        content: '<div data-gjs-type="text">Insert your text here</div>'
      },
      {
        id: "image",
        label: "Image",
        // Select the component once it's dropped
        select: true,
        // You can pass components as a JSON instead of a simple HTML string,
        // in this case we also use a defined component type `image`
        content: { type: "image" },
        // This triggers `active` event on dropped components and the `image`
        // reacts by opening the AssetManager
        activate: true
      }
    ]
  }
});

const blockManager = editor.BlockManager;
const commands = editor.Commands;
const panels = editor.Panels;

commands.add("add-section", editor => {
  const section = editor.BlockManager.get('section');
  console.log(section)
  editor.DomComponents.addComponent(section.attributes.content)
})

panels.addPanel({
  id: 'panel-top',
  el: '.panel__top',
});

panels.addPanel({
  id: 'basic-actions',
  el: '.panel__basic-actions',
  buttons: [
    {
      id: 'visibility',
      active: true, // active by default
      className: 'btn-toggle-borders',
      label: '<u>B</u>',
      command: 'sw-visibility', // Built-in command
    }, {
      id: 'export',
      className: 'btn-open-export',
      label: 'Exp',
      command: 'export-template',
      context: 'export-template', // For grouping context of buttons from the same panel
    }, {
      id: 'show-json',
      className: 'btn-show-json',
      label: 'JSON',
      context: 'show-json',
      command(editor) {
        editor.Modal.setTitle('Components JSON')
            .setContent(`<textarea style="width:100%; height: 250px;">
            ${JSON.stringify(editor.getComponents())}
          </textarea>`)
            .open();
      },
    }
  ],
});



blockManager.add('section', {
  label: 'Section',
  content: {
    attributes: {
      class: "container-fluid"
    },
    tagName: "section",
    toolbar: [
      {
        "attributes": {
          "class": "fa fa-plus"
        },
        command: "add-section"
      },
      {
        "attributes": {
          "class": "fa fa-arrow-up"
        }
      },
      {
        "attributes": {
          "class": "fa fa-arrows gjs-no-touch-actions",
          "draggable": true
        },
        "command": "tlb-move"
      },
      {
        "attributes": {
          "class": "fa fa-clone"
        },
        "command": "tlb-clone"
      },
      {
        "attributes": {
          "class": "fa fa-trash-o"
        },
        "command": "tlb-delete"
      }
    ],
    style: {
      width: '100%',
      "padding-left": '15px',
      "padding-right": '15px',
      marginRight: 'auto',
      marginLeft: 'auto'
    },
    components: [
      {
        attributes: {
          class: "container"
        },
        style: {
          width: '100%',
          'max-width': '1000px',
          'padding': '15px',
          'margin-right': 'auto',
          'margin-left': 'auto'
        },
        content: 'long dep rai'
      }
    ]
  }
})

editor.on("component:selected", (arg) => {
  // Chi hien khi click vao component ngoai cung component.parent().get('type') === 'wrapper'
  // Su dung command core:open-blocks de mo blocks panel
  // Them 1 button "Su dung" o phia duoi block de append vao ben duoi phan tu dang duoc chon
  console.log(arg.get('toolbar'))
})

/*
* Y tuong them duong line:
* - Chi hoat dong trong cung 1 section
* - Khi 1 component dang drag cac component xung quanh lang nghe su kien nay va lay thong tin vi tri dang duoc drag
* - Neu trung voi line nao cua component thi se hien len
* */


