import {Injectable, signal, WritableSignal} from "@angular/core";
import {v4 as uuidv4} from 'uuid';
import {ref, Storage, UploadTask, uploadBytesResumable, getDownloadURL} from "@angular/fire/storage";
import {ToastrService} from "ngx-toastr";
import {FileInput} from "ngx-material-file-input";

@Injectable({providedIn: 'root'})
export class ArchivoService
{
  private avanceCarga = signal<number>(0);

  constructor(private storage: Storage, private toast: ToastrService) {}

  static rutaGuardar(tipoDoc: string, nombreArchivo: string, carpeta: string): string
  {
    const mes = new Date().toLocaleDateString('es-mx', {month: 'long'});
    return `BachillerMilitar/${carpeta}/${tipoDoc}/${new Date().getFullYear()}/${mes}/${this.nombreArchivo(nombreArchivo)}`;
  }

  get obtenerAvances(): WritableSignal<number>
  {
    return this.avanceCarga;
  }

  async subirFirebase(archivo: File, url: string): Promise<UploadTask>
  {
    const docRef = ref(this.storage, url);
    const subirDoc: UploadTask = uploadBytesResumable(docRef, archivo);
    subirDoc.on('state_changed', (snapshot) =>
    {
      this.avanceCarga.set((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
    }, error => this.toast.error(error.message, 'Error al subir el archivo'));
    return subirDoc;
  }

  async cargarArchivos(tipoDoc: string, archivo: FileInput, carpeta: string): Promise<string[]>
  {
    const urls: string[] = [];
    try
    {
      for (const docGuardar of archivo.files)
      {
        const url = ArchivoService.rutaGuardar(tipoDoc, docGuardar.name, carpeta);
        const cargaDoc = await this.subirFirebase(docGuardar, url);
        const urlObtenida = await getDownloadURL(cargaDoc.ref);
        urls.push(urlObtenida);
      }
      return urls;
    } catch (e)
    {
      this.toast.error('Error', 'Error al subir docs');
      return urls;
    }
  }

  private static nombreArchivo(nombreArchivo: string): string
  {
    return new Date().getFullYear() + '-' + uuidv4() + '.' + nombreArchivo.split('.').pop();
  }
}
