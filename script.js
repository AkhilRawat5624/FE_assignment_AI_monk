const tree = {
    name: 'root',
    children: [
        {
            name: 'child1',
            children: [
                { name: 'child1-child1', data: "c1-c1 Hello" },
                { name: 'child1-child2', data: "c1-c2 JS" }
            ]
        },
        { name: 'child2', data: "c2 World" }
    ]
};

function createTag(tagData) {
    const tag = document.createElement('div');
    tag.classList.add('tag');

    const tagHeader = document.createElement('div');
    tagHeader.classList.add('tag-header');
    const collapseBtn = document.createElement('button');
    collapseBtn.classList.add('collapse-btn');
    collapseBtn.textContent = 'v';
    const tagName = document.createElement('input');
    tagName.classList.add('tag-name');
    tagName.type = 'text';
    tagName.value = tagData.name;
    const addChildBtn = document.createElement('button');
    addChildBtn.classList.add('add-child-btn');
    addChildBtn.textContent = 'Add Child';
    tagHeader.appendChild(collapseBtn);
    tagHeader.appendChild(tagName);
    tagHeader.appendChild(addChildBtn);

    const tagContent = document.createElement('div');
    tagContent.classList.add('tag-content');
    const tagDataInput = document.createElement('input');
    tagDataInput.classList.add('tag-data');
    tagDataInput.type = 'text';
    tagDataInput.value = tagData.data || '';
    const exportBtn = document.createElement('button');
    exportBtn.classList.add('export-btn');
    exportBtn.textContent = 'Export';
    tagContent.appendChild(tagDataInput);
    tagContent.appendChild(exportBtn);

    const children = document.createElement('div');
    children.classList.add('children');

    tag.appendChild(tagHeader);
    tag.appendChild(tagContent);
    tag.appendChild(children);

    collapseBtn.addEventListener('click', () => {
        tagContent.style.display = tagContent.style.display === 'none' ? 'block' : 'none';
        collapseBtn.textContent = tagContent.style.display === 'none' ? '>' : 'v';
    });

    addChildBtn.addEventListener('click', () => {
        const newChild = { name: 'New Child', data: 'Data' };
        tagData.children = tagData.children || [];
        tagData.children.push(newChild);
        children.appendChild(createTag(newChild));
    });

    tagDataInput.addEventListener('input', () => {
        tagData.data = tagDataInput.value;
    });

    exportBtn.addEventListener('click', () => {
        const exportedData = JSON.stringify(tree, ['name', 'children', 'data'], 2);
        console.log(exportedData);
    });

    tagName.addEventListener('dblclick', () => {
        const nameInput = document.createElement('input');
        nameInput.type = 'text';
        nameInput.value = tagData.name;
        tagHeader.replaceChild(nameInput, tagName);
        nameInput.focus();

        nameInput.addEventListener('blur', () => {
            tagData.name = nameInput.value;
            tagHeader.replaceChild(tagName, nameInput);
            tagName.value = nameInput.value;
        });

        nameInput.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                tagData.name = nameInput.value;
                tagHeader.replaceChild(tagName, nameInput);
                tagName.value = nameInput.value;
            }
        });
    });

    if (tagData.children) {
        tagData.children.forEach(childData => {
            children.appendChild(createTag(childData));
        });
    }

    return tag;
}

const rootElement = document.getElementById('root');
rootElement.appendChild(createTag(tree));