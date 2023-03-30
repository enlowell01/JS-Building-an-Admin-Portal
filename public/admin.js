async function main() {
    
    let response = await fetch('http://localhost:3001/listBooks')
    
    let bookList = await response.json()
    
    bookList.forEach(renderBook)
}

function renderBook(book) {

    let root = document.querySelector('#root')
    
    let list = document.createElement('li')
    list.textContent = book.title

    let bookQuantity = document.createElement('input')
    bookQuantity.value = book.quantity

    let subBut = document.createElement('button')
    subBut.textContent = 'Save'

    subBut.addEventListener('click', () => {
        fetch('http://localhost:3001/updateBook', {
            method: 'PATCH',
            body: JSON.stringify({
                id: book.id,
                quantity: bookQuantity.value
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
    })

    list.append(bookQuantity, subBut)

    root.append(list)

}

main()