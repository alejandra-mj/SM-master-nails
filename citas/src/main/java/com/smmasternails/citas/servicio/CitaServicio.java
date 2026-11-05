package com.smmasternails.citas.servicio;

import com.smmasternails.citas.modelo.Cita;
import com.smmasternails.citas.modelo.Cliente;
import com.smmasternails.citas.modelo.Servicio;
import com.smmasternails.citas.repositorio.CitaRepositorio;
import com.smmasternails.citas.repositorio.ClienteRepositorio;
import com.smmasternails.citas.repositorio.ServicioRepositorio;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
public class CitaServicio {

    private final CitaRepositorio citaRepositorio;
    private final ClienteRepositorio clienteRepositorio;
    private final ServicioRepositorio servicioRepositorio;

    public CitaServicio(CitaRepositorio citaRepositorio,
                        ClienteRepositorio clienteRepositorio,
                        ServicioRepositorio servicioRepositorio) {
        this.citaRepositorio = citaRepositorio;
        this.clienteRepositorio = clienteRepositorio;
        this.servicioRepositorio = servicioRepositorio;
    }

    
    public List<Cita> listarCitas(String nombreBuscado) {
        if (nombreBuscado == null || nombreBuscado.isBlank()) {
            return citaRepositorio.findAll();
        }
        return citaRepositorio.findByClienteUsuarioNombreContainingIgnoreCase(nombreBuscado);
    }

   
    public Optional<Cita> buscarCitaPorId(Integer idCita) {
        return citaRepositorio.findById(idCita);
    }


    public Cita guardarCita(Cita cita) {
        return citaRepositorio.save(cita);
    }


    public void eliminarCita(Integer idCita) {
        citaRepositorio.deleteById(idCita);
    }

    
    public List<Cliente> listarClientes() {
        return clienteRepositorio.findAll();
    }

    
    public List<Servicio> listarServicios() {
        return servicioRepositorio.findAll();
    }


    public Optional<Cliente> buscarCliente(Integer idCliente) {
        return clienteRepositorio.findById(idCliente);
    }

    
    public Optional<Servicio> buscarServicio(Integer idServicio) {
        return servicioRepositorio.findById(idServicio);
    }
}

