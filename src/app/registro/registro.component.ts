import {Component, signal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatCardModule} from "@angular/material/card";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {FileInput, MaterialFileInputModule} from "ngx-material-file-input";
import {MatButtonModule} from "@angular/material/button";
import {ServicioService} from "../servicio.service";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {ArchivoService} from "../archivo.service";
import {EncuentroNacionalInput, EncuentroNacionalType} from "../../gql/generated";
import {finalize, tap} from "rxjs";
import {v4 as uuidv4} from 'uuid';
import JsPDF from 'jspdf';
import html2canvas from 'html2canvas';
@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatInputModule, MatSelectModule, MaterialFileInputModule, MatButtonModule, ReactiveFormsModule, MatProgressBarModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.scss'
})
export class RegistroComponent
{
  formReg = this.formB.group({
    nombrePlantel: ['', Validators.required],
    correoPlantel: ['', Validators.required],
    telefonoPlantel: ['', Validators.required],
    estadoPlantel: ['', Validators.required],
    municipioPlantel: ['', Validators.required],
    callePlantel: ['', Validators.required],
    coloniaPlantel: ['', Validators.required],

    nombreContig: ['', Validators.required],
    correoContig: ['', Validators.required],
    telefonoContig: ['', Validators.required],

    nombreAlumno: ['', Validators.required],
    fotografia: ['', Validators.required],
    disciplina: ['', Validators.required],
    modalidad: ['', Validators.required]
  });

  estaCargando = signal(false);
  alerta = signal(false);
  urlImg = signal('assets/img/perfil/perfil.jpg');

  datosDelRegistro!: EncuentroNacionalType;
  ext = '';

  constructor(private servicioService: ServicioService, private formB: FormBuilder, private archivoService: ArchivoService) {}

  async registrar(): Promise<void>
  {
    this.estaCargando.set(true);
    const foto: FileInput = this.formReg.get('fotografia')?.value as unknown as FileInput;

    const archivo = await this.archivoService.cargarArchivos('FotoAlumno', foto, 'Competencia');
    // @ts-ignore
this.ext = foto.files[0].name.split('.').pop();
    const datos: EncuentroNacionalInput =
      {
        ...this.formReg.getRawValue(),
        _id: null,
        idBuscar: uuidv4().substring(0, 7).toUpperCase(),
        fotografia: archivo[0],
      };
    this.formReg.disable();
    this.servicioService.registro(datos).pipe(finalize(() =>
    {
      this.estaCargando.set(false);
      this.formReg.enable();
    }), tap((res) =>
    {
      if (res && res.data && res.data.registro)
      {
        this.alerta.set(true);
        this.datosDelRegistro = res.data.registro;
      }
    })).subscribe()
  }

imprimirReg(): void {
  const titulo = 'ENCUENTRO NACIONAL DE BACHILLERATOS MILITARIZADOS';
  const doc = new JsPDF('p', 'pt', 'a4' );

  const imgAncho = 150;
  const imgAlto = 150;
  const x = (doc.internal.pageSize.getWidth() - imgAncho) / 2; // Ajuste para centrar

  doc.text(titulo, doc.internal.pageSize.width / 2, 60, { align: 'center' });

  // @ts-ignore
  html2canvas(document.getElementById('content')).then((canvas: { toDataURL: (arg0: string) => any; }) => {
    const imgData = canvas.toDataURL('image/jpeg');
    // @ts-ignore
    doc.addImage(imgData, 'JPEG', x, 120, imgAncho, imgAlto, 'Fotografia', 'MEDIUM');
    doc.save('Registro.pdf');
  });
}
cambioImg(e: any):void {
    const file:File = e.target.files[0];

    if (file)
      {
        const reader = new FileReader();
        reader.onload = (ev: any) =>
        {
          this.urlImg.set(ev.target.result);
        }
        reader.readAsDataURL(file);
      }
}
}

