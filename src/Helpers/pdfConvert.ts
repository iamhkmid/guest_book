import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

const doc = new jsPDF()

// It can parse html:
// <table id="my-table"><!-- ... --></table>
autoTable(doc, { html: '#my-table' })

// Or use javascript directly:
autoTable(doc, {
  head: [['Name', 'Email', 'Country']],
  body: [
    ['David', 'david@example.com', 'Sweden'],
    ['Castille', 'castille@example.com', 'Spain'],
    // ...
  ],
})

doc.save('table.pdf')