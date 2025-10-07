# Arrow Functions vs Normal Functions en Contexto Asíncrono

## Diferencias principales:

### Contexto (`this`)
- **Función normal:** `this` se determina por cómo se llama
- **Arrow function:** `this` se toma del contexto donde se define

### En contextos asíncronos:
En JavaScript, this se determina por cómo se ejecuta la función, no donde se define. Los contextos asíncronos ejecutan funciones fuera de su objeto original, perdiendo el this.
Cuando JavaScript ejecuta código asíncrono (promesas, callbacks, setTimeout), extrae la función de su contexto original y la ejecuta en el contexto global, perdiendo así su bindeo

- Las **funciones normales** pierden el contexto `this`
- Las **arrow functions** NO tienen su propio this. En su lugar, "heredan" el this del contexto donde se definieron.
- Las **arrow functions** conservan el contexto original

## Cuándo usar cada una:
- **Arrow functions:** Para callbacks, event handlers, métodos que se pasan como referencia, código asíncrono que se ejecuta desde el exterior y acceda a un contexto interno
- **Funciones normales:** Para métodos internos complejos, constructores

## Ejemplo práctico:
```typescript
class MiServicio {
  // ✅ Arrow function - conserva el contexto
  public loadData = async (): Promise<Data> => { ... }
  
  // ✅ Función normal - método interno
  private processData(data: any): ProcessedData { ... }
}
```