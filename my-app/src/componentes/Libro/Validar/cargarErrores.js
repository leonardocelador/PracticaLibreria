
const cargarErrores = (libro, errores) => {

    const result= {};

    if(errores.length !== 0){

        errores.map(propiedad=>{
            
            if(libro[propiedad]){
                if(libro[propiedad].trim() !== ''){
                    result[propiedad]=false;
                }
                else{
                        result[propiedad]=true;
                    }
            }
            else{
                result[propiedad]=true;
            }
            return true;
        }
        )
        return result;
    }
    else{
        Object.keys(errores).map((error)=>{
            result[error]=true;
            return true;
        })
        return result;
    }
}

export default cargarErrores
