import Swal from 'sweetalert2';
import axios from 'axios';

const btnEliminar = document.querySelectorAll('a.eliminar-producto');
  for (const btn of btnEliminar) {
    btn.addEventListener('click', e =>{
      const urlProducto = e.target.dataset.productoUrl;
        Swal.fire({
          title: '¿Seguro que quiere eliminar el producto?',
          text: "¡Si se elimina, pierde el producto!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Si, eliminar',
          cancelButtonText: 'Cancelar'
        }).then((result) => {
          if (result.isConfirmed) {
            const url =`${location.origin}/eliminarProducto/${urlProducto}`;
            axios.delete(url, {params: {urlProducto}})
              .then(function(respuesta){
                    Swal.fire(
                      'Producto eliminado!',
                      respuesta.data,
                      'success'
                    );
                    setTimeout(()=>{
                      window.location.href='/verProductos'
                    }, 2000);
              });
              }
          })  
      })
  }
export default btnEliminar;

