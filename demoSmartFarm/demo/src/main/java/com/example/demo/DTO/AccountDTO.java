package com.example.demo.DTO;

import lombok.Getter;
import lombok.Setter;

import java.util.Set;
import java.util.HashSet;

@Getter
@Setter
public class AccountDTO {
    private Long id;
    private String fullName;
    private String email;
    private String password;
    private String phone;
    private String address;
    private String role;

    private Long farmId;     // ID farm
    private Long fieldId;    // ID field

    private String farmName;  // Tên farm
    private String fieldName; // Tên field

    String token;
        private Set<Role> roles = new HashSet<>();

        public Set<Role> getRoles() {
            return roles;
        }

        public void setRoles(Set<Role> roles) {
            this.roles = roles;
        }

}
