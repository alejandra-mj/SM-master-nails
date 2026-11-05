package com.smmasternails.citas.repositorio;

import com.smmasternails.citas.modelo.Cita;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface CitaRepositorio extends JpaRepository<Cita, Integer> {

    
    List<Cita> findByClienteUsuarioNombreContainingIgnoreCase(String nombre);
}
