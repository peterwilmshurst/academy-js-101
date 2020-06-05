// /* Revealing Modue Pattern - allows us to create private variables within the function but also add them to the return list to make them public and expose them to public functions.

// const Module = (function(){
//     //Private
//    let a = 6;

//     //Public
//     return {
//         get: function() {
//             return a;
//         },
//         set: function(newValue) {
//             a = newValue;
//         }
//     }
// })();


// ES6

// const Module = (function(){
//     //Private
//    let a = 6;

//     //Public
//     return {
//         get() {
//             return a;
//         },
//         set(newValue) {
//             a = newValue;
//         }
//     }
// })();

// declare functions in the private space and call them in the Public space. In this case, set is private but get is available.

// const Module = (function () {
//     //Private
//     let a = 6;

//     function get() {
//         return a;
//     }

//     function set(newValue) {
//         a = newValue;
//     }

//     //Public
//     return {
//         get
//     }
// })();

// ------------- REAL WORLD EXAMPLE -------------- //

// Local Storage
const Storage = (() => {
    // Private

    function setItem(arrayOfItems) {
        const itemsString = JSON.stringify(arrayOfItems); // convert our array of items into a string so that local storage can store it (only accepts a string)
        localStorage.setItem("ToDo123!", itemsString);
    }

    function getItem() {
        const itemsString = localStorage.getItem("ToDo123!");

        if (itemsString) {
            return JSON.parse(itemsString);
        } else {
            return [];
        }
    }

    //Public
    return {
        setItem,
        getItem
    }
})();

// Item
const Item = (() => {
    // Private
    const items = Storage.getItem();
    const current = {};

    class Task {
        constructor(id, title) {
            this.title = title;
            this.id = id;
            this.status = false;
        };
    }

    function addItem(title) {

        let id = 0;

        if (items.length) {
            id = items[items.length - 1].id + 1;

        }

        const item = new Task(id, title);
        items.push(item); // pushes the 'item' to the 'items' array
    }

    function deleteItem(id) {
        // console.log(id);
        items.forEach((item, i) => {
            if (item.id == id) {
                // Remove from array
                items.splice(i, 1);
            }
        });
    }

    function getItemById(id) {
        // console.log(id);
        return items.filter(item => item.id == id)[0];
    }

    function updateItem(modifiedItem) {
        items.forEach((item, i) => {
            if (modifiedItem.id === item.id) {
                item.title = modifiedItem.title;
                item.status = modifiedItem.status;
            }
        });
    }

    //Public
    return {
        current,
        items,
        addItem,
        deleteItem,
        getItemById,
        updateItem
    }
})();

// UI
const UI = (() => {
    // Private
    const addItem = document.getElementById('addItem');
    const saveItem = document.getElementById('saveItem');
    const listItem = document.getElementById('listItem');

    function generateView(items) {

        items.forEach(item => {
            listItem.innerHTML += `<tr data-id="${item.id}">
    <th scope="row">${item.id}</th>
    <td class="${(item.status) ? 'complete' : ""}">${item.title}</td>
    <td class="text-right">
            <button type="button" class="btn btn-secondary" data-action="edit"><i class="far fa-edit"></i></button>
            <button type="button" class="btn btn-success" data-action="complete"><i class="fas fa-check"></i></button>
            <button type="button" class="btn btn-danger" data-action="delete"><i class="far fa-trash-alt"></i></button>
    </td>
</tr>`
        });
    }

    function clearView() {
        listItem.innerHTML = "";
    }

    function updateItem(item) {
        addItem.value = item.title;
    }

    //Public
    return {
        addItem,
        saveItem,
        listItem,
        generateView,
        clearView,
        updateItem
    }
})();

// App
// const App = (()=>{
//     // Private
//     UI.saveItem.addEventListener('click', (e)=>{
//         if(e.screenX === '245') { } // add the 'e' object, if we want to use any of the methods associated with the click event. See these options by doing this: I.saveItem.addEventListener('click', (e)=>{console.log(e);});

//     });
// })();


// App
const App = (() => {
    // Private
    UI.saveItem.addEventListener('click', () => {

        // Does it exist?
        if (Item.current.title) {
            const modifiedItem = {
                id: Item.current.id,
                title: UI.addItem.value,
                status: Item.status
            }

            Item.updateItem(modifiedItem);

            // Clear table
            UI.clearView();

            // Generate rows
            UI.generateView(Item.items);

            // Hides modal
            $('#modal').modal('hide'); //jQuery syntax (as modal comes with Bootstrap)


            // Clear item
            UI.addItem.value = '';

            // Save to localStorage
            Storage.setItem(Item.items);

            // Set current to empty

            Item.current = {};


        } else {

            if (UI.addItem.value) {
                // Save item
                Item.addItem(UI.addItem.value);

                // Clear table
                UI.clearView();

                // Generate rows
                UI.generateView(Item.items);

                // Hides modal
                $('#modal').modal('hide');


                // Clear item
                UI.addItem.value = '';

                // Save to localStorage
                Storage.setItem(Item.items);

            }
        }


    });

    // Draws rows saved in local storage on page load
    addEventListener('load', () => {
        UI.generateView(Item.items);

    });

    // Event Delegation
    UI.listItem.addEventListener('click', (e) => {

        if (e.target.hasAttribute('data-action')) {

            switch (e.target.getAttribute("data-action")) { // switch, better than if else, if else, if else

                case 'edit':

                // console.log("edit", e.target.parentElement.parentElement.getAttribute("data-id")); // will console log the id of the row

                {
                    // Find an item
                    const item = Item.getItemById(e.target.parentElement.parentElement.getAttribute("data-id"));
                    // console.log(item);

                    // Update Item
                    UI.updateItem(item);

                    Item.current = item;

                    // Show modal
                    $('#modal').modal('show');
                };


                break;

            case 'complete':

                // console.log("complete");
                const item = Item.getItemById(e.target.parentElement.parentElement.getAttribute("data-id"));
                const modifiedItem = {
                    id: item.id,
                    title: item.title,
                    status: true
                }
    
                Item.updateItem(modifiedItem);

                // Update status
                UI.clearView();
                UI.generateView(Item.items);
                Storage.setItem(Item.items);

                break;

            case 'delete':

            // console.log("delete");
            {

                Item.deleteItem(e.target.parentElement.parentElement.getAttribute("data-id"));
                UI.clearView();
                UI.generateView(Item.items);
                Storage.setItem(Item.items);
            }


            break;

            default:

                break;

            }
        }

    });

    //Public
    return {

    }
})();