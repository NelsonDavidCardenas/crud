import React from "react";
import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Table,
  Button,
  Container,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  ModalFooter,
} from "reactstrap";

const data = [
  { id: 1, Pez: "Pez dorado comun", Nombre_cientifico: "Carassius auratus" },
  { id: 2, Pez: "Pez cíclido convicto", Nombre_cientifico: "Amatitlania nigrofasciata" },
  { id: 3, Pez: "Pez ramirezi", Nombre_cientifico: "Mikrogeophagus ramirezi" },
  { id: 4, Pez: "Pez platy", Nombre_cientifico: "Xiphophorus maculatus" },
  { id: 5, Pez: "Pez gurami enano", Nombre_cientifico: "Thrichogaster lalius"},
  { id: 6, Pez: "Pez tetra neón", Nombre_cientifico: "Paracheirodon innesi" },
];

class App extends React.Component {
  state = {
    data: data,
    modalActualizar: false,
    modalInsertar: false,
    form: {
      id: "",
      Pez: "",
      Nombre_cientifico: "",
    },
    
  };

  mostrarModalActualizar = (dato) => {
    this.setState({
      form: dato,
      modalActualizar: true,
    });
  };

  cerrarModalActualizar = () => {
    this.setState({ modalActualizar: false });
  };

  mostrarModalInsertar = () => {
    this.setState({
      modalInsertar: true,
    });
  };

  cerrarModalInsertar = () => {
    this.setState({ modalInsertar: false });
  };

  editar = (dato) => {
    var contador = 0;
    var arreglo = this.state.data;
    arreglo.map((registro) => {
      if (dato.id == registro.id) {
        arreglo[contador].Pez = dato.Pez;
        arreglo[contador].Nombre_cientifico = dato.Nombre_cientifico;
      }
      contador++;
    });
    this.setState({ data: arreglo, modalActualizar: false });
  };

  eliminar = (dato) => {
    var opcion = window.confirm("Estás Seguro que deseas Eliminar el elemento "+dato.id);
    if (opcion == true) {
      var contador = 0;
      var arreglo = this.state.data;
      arreglo.map((registro) => {
        if (dato.id == registro.id) {
          arreglo.splice(contador, 1);
        }
        contador++;
      });
      this.setState({ data: arreglo, modalActualizar: false });
    }
  };

  insertar= ()=>{
    var valorNuevo= {...this.state.form};
    valorNuevo.id=this.state.data.length+1;
    var lista= this.state.data;
    lista.push(valorNuevo);
    this.setState({ modalInsertar: false, data: lista });
  }

  handleChange = (e) => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
  };

  

  render() {
    
    return (
      <>
        <Container>
        <br/>
        <Button color="primary" onClick={()=>this.mostrarModalInsertar()}>Insertar</Button>
        <br/> <br/>

        <Table>
          <thead><tr><th>Id</th>
          <th>Pez</th>
          <th>Nombre cientifico</th>
          <th>Acciones</th></tr></thead>
          <tbody>
            {this.state.data.map((dato)=>(
              <tr>
                <td>{dato.id}</td>
                <td>{dato.Pez}</td>
                <td>{dato.Nombre_cientifico}</td>
                <td><Button color="primary"onClick={() => this.mostrarModalActualizar(dato)}>Editar</Button>{"  "}
                <Button color="danger" onClick={()=> this.eliminar(dato)}>Eliminar</Button></td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>

      <Modal isOpen={this.state.modalActualizar}>
          <ModalHeader>
           <div><h3>Editar Registro</h3></div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>
               Id:
              </label>
            
              <input
                className="form-control"
                readOnly
                type="text"
                value={this.state.form.id}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                Pez: 
              </label>
              <input
                className="form-control"
                name="personaje"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.Pez}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                Nombre_cientifico: 
              </label>
              <input
                className="form-control"
                name="anime"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.Nombre_cientifico}
              />
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button
              color="primary"
              onClick={() => this.editar(this.state.form)}
            >
              Editar
            </Button>
            <Button
              color="danger"
              onClick={() => this.cerrarModalActualizar()}
            >
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>



        <Modal isOpen={this.state.modalInsertar}>
          <ModalHeader>
           <div><h3>Insertar Pez</h3></div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>
                Id: 
              </label>
              
              <input
                className="form-control"
                readOnly
                type="text"
                value={this.state.data.length+1}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                Pez: 
              </label>
              <input
                className="form-control"
                name="Pez"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                Nombre_cientifico: 
              </label>
              <input
                className="form-control"
                name="Nombre_cientifico"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button
              color="primary"
              onClick={() => this.insertar()}
            >
              Insertar
            </Button>
            <Button
              className="btn btn-danger"
              onClick={() => this.cerrarModalInsertar()}
            >
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>


        
      </>
    );
  }
}
export default App;
