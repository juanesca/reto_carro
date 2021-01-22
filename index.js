"use-strict";
//Objeto Carro
class Carro {
  constructor() {
    this.moviendo = false;
   // this.Clutch = false;
    this.frenando = false;
    this.frenoMano = Math.floor(Math.random() * 2) == 0 ? false : true;
    this.topeVelocidad = 0;
    this.velocidad = 0;
    this.aceleracion = 0;
    this.distancia = 0;
    this.marcha = Math.floor(Math.random() * 3) - 1;
    this.palanca =
      this.marcha == 1
        ? 1
        : this.marcha == -1
        ? 4
        : Math.floor(Math.random() * 3) + 1;
    this.cambiarMarcha(this.palanca);
    this.desaceleracion = -Math.random() * 0.2;
    this.encendido = false;
    this.historial = [];
    this.tiempo = 0;
    this.timer = setInterval(this.mover, 500);
    this.pausa = false;
    this.map = NaN;
    this.route = [];
    this.ubicacion = 0;
    this.parabrisas = false;
    this.derecha = false;
    this.izquierda = false;
    this.volanteP = "centro";
  }
  acelerar = async () => {
    if (!this.frenoMano) {
      if (!this.moviendo) {
        escribir("Se piso el acelerador");
      }
      this.moviendo = true;
    } else {
      escribir("Quita el Freno de Mano");
    }
  };
  dejarAcelerar = async () => {
    if (!this.frenando && this.moviendo) {
      escribir("Se solto el acelerador");
      this.moviendo = false;
    }
  };
  mover = async () => {
    let compro = this.velocidad == 0;
    if (this.moviendo || this.velocidad != 0) {
      this.tiempo += 0.5;
    }
    if (this.marcha > 0 && this.moviendo) {
      this.distancia =
        this.distancia +
        (this.velocidad * 0.5 +
          0.5 * 0.5 * 0.5 * (this.aceleracion + this.desaceleracion));
      this.velocidad =
        this.velocidad +
        (this.frenando
          ? 4 * this.aceleracion - 1
          : this.aceleracion + this.desaceleracion) *
        0.5;
      if (this.velocidad > this.topeVelocidad) {
        this.velocidad = this.topeVelocidad;
      }
      if (this.velocidad < 0) {
        this.velocidad = 0;
      }
    } else if (this.marcha > 0) {
      this.distancia =
        this.distancia +
        (this.velocidad * 0.5 + 0.5 * 0.5 * 0.5 * this.desaceleracion);
      this.velocidad = this.velocidad + this.desaceleracion * 0.5;
      if (this.velocidad < 0) {
        this.velocidad = 0;
      }
    } else if (this.marcha == 0 && !this.moviendo) {
      if (this.velocidad != 0) {
        this.distancia =
          this.distancia +
          (this.velocidad * 0.5 +
            0.5 * 0.5 * 0.5 * (this.aceleracion + this.desaceleracion));
      }
      if (this.aceleracion >= 0) {
        this.velocidad =
          this.velocidad +
          (this.frenando ? 4 * this.desaceleracion - 1 : this.desaceleracion) *
          0.5;
        if (this.velocidad < 0) {
          this.velocidad = 0;
        }
      }
      if (this.aceleracion < 0) {
        this.velocidad =
          this.velocidad -
          (this.frenando ? 4 * this.desaceleracion + 1 : this.desaceleracion) *
          0.5;
        if (this.velocidad > 0) {
          this.velocidad = 0;
        }
      }
    } else if (this.marcha == 0 && this.moviendo) {
      this.distancia = this.distancia + this.velocidad * 0.5;
      if (this.frenando) {
        if (this.aceleracion > 0) {
          this.velocidad =
            this.velocidad +
            (this.frenando
              ? 4 * this.desaceleracion - 1
              : this.desaceleracion + this.aceleracion) *
            0.5;
          if (this.velocidad < 0) {
            this.velocidad = 0;
          }
        } else if (this.aceleracion > 0) {
          this.velocidad =
            this.velocidad +
            (this.frenando
              ? 4 * this.aceleracion + 1
              : this.aceleracion + this.desaceleracion) *
            0.5;
          if (this.velocidad > 0) {
            this.velocidad = 0;
          }
        }
      }
    } else if (this.marcha < 0 && this.moviendo) {
      this.distancia =
        this.distancia +
        (this.velocidad * 0.5 + 0.5 * 0.5 * 0.5 * this.aceleracion);
      this.velocidad =
        this.velocidad +
        (this.frenando ? 4 * this.aceleracion + 1 : this.aceleracion) * 0.5;
      if (this.velocidad < this.topeVelocidad) {
        this.velocidad = this.topeVelocidad;
      }
      if (this.velocidad > 0) {
        this.velocidad = 0;
      }
    } else {
      this.distancia =
        this.distancia +
        (this.velocidad * 0.5 - 0.5 * 0.5 * 0.5 * this.desaceleracion);
      this.velocidad =
        this.velocidad -
        (this.frenando ? 4 * this.desaceleracion + 0.5 : this.desaceleracion) *
        0.5;
      if (this.velocidad > 0) {
        this.velocidad = 0;
      }
    }
    /*
    if (this.velocidad == 0) {
      document.getElementById("ruta").src = "./Images/carreteraimg.jpg";
    } else if (compro) {
      document.getElementById("ruta").src = "./Images/carretera.gif";
    }*/
    document.getElementById("Velocidad").textContent =
      Math.round(x.velocidad * (180 / 5)) / 10 + " km/h";
    document.getElementById("Distancia").textContent =
      Math.round(x.distancia / 100) / 10 + " km";
  };

  encender = async () => {
    if (!this.frenoMano) {
      return escribir("Pon el freno de mano antes");
    } else if (this.marcha != 0) {
      return escribir("Coloca el carro en neutro");
    } else if (this.encendido) {
      if (this.velocidad != 0) {
        return escribir(
          "Para apagar el carro primero tiene que estar detenido"
        );
      } else {
        this.encendido = false;
        document.getElementById("Enter").style.backgroundColor = "white";
        return escribir("Se apago el carro");
      }
    } else {
      this.encendido = true;
      document.getElementById("Enter").style.backgroundColor = "red";
      return escribir("Se encendio el carro");
    }
  };
  cambiarMarcha = async (aux) => {
    if (this.palanca == 4) {
      if (this.velocidad <= 25 / 3 && this.velocidad >= 0) {
        this.topeVelocidad = 25 / 3;
        this.marcha = 1;
        this.aceleracion = 0.3;
      }
      if (this.velocidad <= 50 / 3 && this.velocidad > 50 / 9) {
        this.topeVelocidad = 50 / 3;
        this.marcha = 2;
        this.aceleracion = 0.7;
      }
      if (this.velocidad <= 25 && this.velocidad > 125 / 9) {
        this.topeVelocidad = 25;
        this.marcha = 3;
        this.aceleracion = 1.2;
      }
      if (this.velocidad <= 100 / 3 && this.velocidad > 200 / 9) {
        this.topeVelocidad = 100 / 3;
        this.marcha = 4;
        this.aceleracion = 1.6;
      }
      if (this.velocidad <= 125 / 3 && this.velocidad > 275 / 9) {
        this.marcha = 5;
        this.topeVelocidad = 125 / 3;
        this.aceleracion = 2;
      }
    } else if (this.palanca == 2) {
      this.marcha = -1;
      this.topeVelocidad = -25 / 9;
      this.aceleracion = -0.2;
    } else {
      this.marcha = 0;
    }

    /* else if (this.palanca == 2) {
       else {
        this.palanca = aux;
        escribir(
          "Para poner Tercera debe tener una velocidad de entre 90 y  50 km/h"
        );
      }
    } else if (this.palanca == 3) {
      else {
        this.palanca = aux;
        escribir(
          "Para poner Quinta debe tener una velocidad de entre 150 y  110 km/h"
        );
      }
    } else if (this.palanca == 7) {
       else {
        this.palanca = aux;
        escribir(
          "Para poner Segunda debe tener una velocidad de entre 60 y  20 km/h"
        );
      }
    } else if (this.palanca == 8) {
       else {
        this.palanca = aux;
        escribir(
          "Para poner Cuarta debe tener una velocidad de entre 120 y  80 km/h"
        );
      }
    } else  */
  };
  subirPalanca = async () => {
    let aux = this.palanca;
    /*
    if (this.palanca > 3) {
      this.palanca -= 3;
    }
    */
    if (this.palanca > 1) {
      this.palanca--;
    } else {
      this.palanca = this.palanca;
    }

    this.cambiarMarcha(aux);

    for (let i = 1; i <= 4; i++) {
      if (this.palanca == i) {
        document.getElementById("Bo" + i).style.backgroundColor = "red";
      } else {
        document.getElementById("Bo" + i).style.backgroundColor = "black";
      }
    }

    let positions = ["Parking", "Reversa", "Neutro", "Drive"];

    if (this.palanca != aux) {
      return escribir(
        "Se movio la palanca de cambios a la posicion: " +
        positions[this.palanca - 1]
      );
    }
  };

  bajarPalanca = async () => {
    let aux = this.palanca;

    /* if (this.palanca < 7) {
      if (this.palanca == 6) {
        if (this.velocidad == 0) {
          this.palanca += 3;
        } else {
          return escribir("Para poner la reversa se debe detener el vehiculo");
        }
      } else {
        this.palanca += 3;
      }
    }*/

    if (this.palanca < 4) {
      this.palanca++;
    } else {
      this.palanca = this.palanca;
    }

    this.cambiarMarcha(aux);

    for (let i = 1; i <= 4; i++) {
      if (this.palanca == i) {
        document.getElementById("Bo" + i).style.backgroundColor = "red";
      } else {
        document.getElementById("Bo" + i).style.backgroundColor = "black";
      }
    }

    let positions = ["Parking", "Reversa", "Neutro", "Drive"];

    if (this.palanca != aux) {
      return escribir(
        "Se movio la palanca de cambios a la posicion: " +
        positions[this.palanca - 1]
      );
    }
  };
  /*
  derechaPalanca = async () => {
    let aux = this.palanca;
    if (this.palanca < 6 && this.palanca > 3) {
      this.palanca += 1;
    }
    this.cambiarMarcha(aux);
    for (let i = 1; i <= 9; i++) {
      if (this.palanca == i) {
        document.getElementById("Bo" + i).style.backgroundColor = "red";
      } else {
        document.getElementById("Bo" + i).style.backgroundColor = "black";
      }
    }
    return escribir(
      "Se movio la palanca de cambios a la posicion: " +
        this.palanca +
        " y se puso la marcha: " +
        this.marcha
    );
  };
  izquierdaPalanca = async () => {
    let aux = this.palanca;
    if (this.palanca < 7 && this.palanca > 4) {
      this.palanca -= 1;
    }
    this.cambiarMarcha(aux);
    for (let i = 1; i <= 9; i++) {
      if (this.palanca == i) {
        document.getElementById("Bo" + i).style.backgroundColor = "red";
      } else {
        document.getElementById("Bo" + i).style.backgroundColor = "black";
      }
    }
    return escribir(
      "Se movio la palanca de cambios a la posicion: " +
        this.palanca +
        " y se puso la marcha: " +
        this.marcha
    );
  };
  */
  /*
  pisarClutch = async () => {
    if (!this.Clutch) {
      escribir("Se piso el Clutch");
    }
    this.Clutch = true;
  };
  dejarClutch = async () => {
    if (this.Clutch) {
      escribir("Se solto el Clutch");
    }
    this.Clutch = false;
  };
  */
  ponerFreno = async () => {
    this.frenoMano = !this.frenoMano;
    if (this.frenoMano) {
      if (this.velocidad == 0) {
        document.getElementById("KeyM").style.backgroundColor = "red";
        return escribir("Se puso el freno de mano");
      } else {
        return escribir("Detenga primero el coche");
      }
    } else {
      document.getElementById("KeyM").style.backgroundColor = "white";
      return escribir("Se quito el freno de mano");
    }
  };

  frenar = async () => {
    if (this.velocidad >= 0 && this.marcha > 0) {
      if (this.aceleracion > 0) {
        this.aceleracion = -this.aceleracion;
      }
      this.moviendo = true;
    }
    if (this.velocidad <= 0 && this.marcha > 0) {
      this.velocidad = 0;
      if (this.aceleracion < 0) {
        this.aceleracion = -this.aceleracion;
      }
      this.moviendo = false;
    }
    if (this.velocidad <= 0 && this.marcha == -1) {
      if (this.aceleracion < 0) {
        this.aceleracion = -this.aceleracion;
      }
      this.moviendo = true;
    }
    if (this.velocidad >= 0 && this.marcha == -1) {
      this.velocidad = 0;
      if (this.aceleracion > 0) {
        this.aceleracion = -this.aceleracion;
      }
      this.moviendo = false;
    }
    if (this.marcha == 0) {
      this.moviendo = false;
    }
    this.frenando = true;
    if (!this.frenando) {
      escribir("Se piso el Freno");
      console.log(this);
    }
  };

  dejarFreno = async () => {
    if (this.frenando) {
      if (this.velocidad >= 0 && this.marcha > 0) {
        this.cambiarMarcha(this.palanca);

        this.moviendo = false;

        if (this.aceleracion < 0) {
          this.aceleracion = -this.aceleracion;
        }
      }

      if (this.velocidad >= 0 && this.marcha == -1) {
        this.cambiarMarcha(this.palanca);

        this.moviendo = false;

        if (this.aceleracion < 0) {
          this.aceleracion = -this.aceleracion;
        }
      }
      escribir("Se solto el Freno");
    }
    this.frenando = false;
  };


  dirIzquierda = async () => {
    this.izquierda = !this.izquierda;
    if (this.izquierda) {
      document.getElementById("KeyZ").style.backgroundColor = "red";
      pintar('Se encendio la direccional izquierda');
    } else {
      document.getElementById("KeyZ").style.backgroundColor = "white";
      pintar('Se apago la direccional izquierda');
    }
  }
  dirDerecha = async () => {
    this.derecha = !this.derecha;
    if (this.derecha) {
      document.getElementById("KeyC").style.backgroundColor = "red";
      pintar('Se encendio la direccional derecha');
    } else {
      document.getElementById("KeyC").style.backgroundColor = "white";
      pintar('Se apago la direccional derecha');
    }
  }
  volante = async (direccion) => {
    if (this.volanteP != direccion) {
      pintar('Se giro el volante hacia ' + direccion);
    }
    this.volanteP = direccion;
  }
}

let x;
let ruta = [];
//escribir mensaje
let escribir = (mensaje) => {
  x.historial.push(mensaje);
  document.getElementById("Panel").textContent = mensaje;
};
//Inicio
window.addEventListener("load", async () => {
  x = new Carro();
  document.getElementById("Velocidad").textContent =
    Math.round(x.velocidad * (180 / 5)) / 10 + " km/h";
  document.getElementById("Distancia").textContent =
    Math.round(x.distancia / 100) / 10 + " km";
  document.getElementById("Bo" + x.palanca).style.backgroundColor = "red";
  if (x.frenoMano) {
    document.getElementById("KeyM").style.backgroundColor = "red";
  }
  return escribir("Enciende el carro");
});

//Undir tecla
window.addEventListener("keydown", async (event) => {
  try {
    if (
      event.code != "KeyC" &&
      event.code != "KeyZ" &&
      event.code != "KeyM" &&
      event.code != "Enter"
    ) {
      document.getElementById(event.code).style.backgroundColor = "red";
    }
  } catch (err) { }
  if (event.keyCode == 13) {
    return x.encender();
  }
  if (event.keyCode == 77) {
    return x.ponerFreno();
  }
  //eventos que necesitan que el carro este encendido
  if (x.encendido) {
    if (event.keyCode == 87) {
      if (document.getElementById("KeyS").style.backgroundColor != "red") {
        return x.acelerar();
      } else {
        document.getElementById("KeyW").style.backgroundColor = "white";
        return escribir("Suelte primero el Freno");
      }
    }/*
    if (event.keyCode == 69) {
      return x.pisarClutch();
    }*/
    if (event.keyCode == 83) {
      if (document.getElementById("KeyW").style.backgroundColor != "red") {
        return x.frenar();
      } else {
        document.getElementById("KeyS").style.backgroundColor = "white";
        return escribir("Suelte primero el acelerador");
      }
    }
    
  } else {
    if (
      !(
        event.keyCode == 13 ||
        event.keyCode == 77 ||
        event.keyCode == 38 ||
        event.keyCode == 40
      )
    ) {
      return escribir("Debes encender el carro antes");
    }
  }
  //Cambios
  if (event.keyCode == 38) {
    return x.subirPalanca();
  }

  if (event.keyCode == 40) {
    return x.bajarPalanca();
  }
  /*   
   if (x.Clutch || !x.encendido) {
     
 
     if (event.keyCode == 39) {
       return x.derechaPalanca();
     }
 
     if (event.keyCode == 37) {
       return x.izquierdaPalanca();
     }
   } else {
     if (event.keyCode == 38) {
       return escribir(
         "Para hacer un cambio el carro debe estar apagado o con el Clutch activado"
       );
     }
 
     if (event.keyCode == 40) {
       return escribir(
         "Para hacer un cambio el carro debe estar apagado o con el Clutch activado"
       );
     }
 
     if (event.keyCode == 39) {
       return escribir(
         "Para hacer un cambio el carro debe estar apagado o con el Clutch activado"
       );
     }
 
     if (event.keyCode == 37) {
       return escribir(
         "Para hacer un cambio el carro debe estar apagado o con el Clutch activado"
       );
     }
   }*/
});
//Soltar tecla

window.addEventListener("keyup", async (event) => {
  try {
    if (
      event.code != "KeyC" &&
      event.code != "KeyZ" &&
      event.code != "KeyM" &&
      event.code != "Enter"
    ) {
      document.getElementById(event.code).style.backgroundColor = "white";
    }
  } catch (err) { }
  if (event.keyCode == 87) {
    x.dejarAcelerar();
  }/*
  if (event.keyCode == 69) {
    x.dejarClutch();
  }*/
  if (event.keyCode == 83) {
    x.dejarFreno();
  }
});
