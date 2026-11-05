package com.smmasternails.citas.controlador;

import com.smmasternails.citas.modelo.Cita;
import com.smmasternails.citas.servicio.CitaServicio;
import jakarta.validation.Valid;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;


@Controller
@RequestMapping("/citas")
public class CitaControlador {

    private final CitaServicio citaServicio;

    public CitaControlador(CitaServicio citaServicio) {
        this.citaServicio = citaServicio;
    }

   
    @GetMapping
    public String listarCitas(@RequestParam(required = false) String buscar, Model modelo) {
        modelo.addAttribute("citas", citaServicio.listarCitas(buscar));
        modelo.addAttribute("buscar", buscar);
        return "citas/lista";
    }

   
    @GetMapping("/nueva")
    public String mostrarFormularioNuevo(Model modelo) {
        modelo.addAttribute("cita", new Cita());
        cargarListas(modelo);
        return "citas/formulario";
    }


    @GetMapping("/editar/{id}")
    public String mostrarFormularioEditar(@PathVariable Integer id, Model modelo,
                                          RedirectAttributes atributos) {
        return citaServicio.buscarCitaPorId(id)
                .map(cita -> {
                    modelo.addAttribute("cita", cita);
                    cargarListas(modelo);
                    return "citas/formulario";
                })
                .orElseGet(() -> {
                    atributos.addFlashAttribute("mensaje", "La cita no existe.");
                    return "redirect:/citas";
                });
    }

    @PostMapping("/guardar")
    public String guardarCita(@Valid @ModelAttribute("cita") Cita cita,
                              BindingResult resultado,
                              @RequestParam(required = false) Integer idCliente,
                              @RequestParam(required = false) Integer idServicio,
                              Model modelo, RedirectAttributes atributos) {


        if (idCliente != null) {
            cita.setCliente(citaServicio.buscarCliente(idCliente).orElse(null));
        }
        if (idServicio != null) {
            cita.setServicio(citaServicio.buscarServicio(idServicio).orElse(null));
        }

        // Valida que se hayan elegido ambos
        if (cita.getCliente() == null) {
            resultado.rejectValue("cliente", "cliente.vacio", "Selecciona un cliente");
        }
        if (cita.getServicio() == null) {
            resultado.rejectValue("servicio", "servicio.vacio", "Selecciona un servicio");
        }

        if (resultado.hasErrors()) {
            cargarListas(modelo);
            return "citas/formulario"; // vuelve al formulario mostrando los errores
        }

        citaServicio.guardarCita(cita);
        atributos.addFlashAttribute("mensaje", "Cita guardada correctamente.");
        return "redirect:/citas";
    }

   
    @PostMapping("/eliminar/{id}")
    public String eliminarCita(@PathVariable Integer id, RedirectAttributes atributos) {
        citaServicio.eliminarCita(id);
        atributos.addFlashAttribute("mensaje", "Cita cancelada.");
        return "redirect:/citas";
    }

   
    private void cargarListas(Model modelo) {
        modelo.addAttribute("clientes", citaServicio.listarClientes());
        modelo.addAttribute("servicios", citaServicio.listarServicios());
    }
}
