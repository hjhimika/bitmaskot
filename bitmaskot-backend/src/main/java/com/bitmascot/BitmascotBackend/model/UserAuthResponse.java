package com.bitmascot.BitmascotBackend.model;

public class UserAuthResponse {
    private final String id;
    private final String message;
    private final boolean isError;
    private final boolean isAdmin;

    private UserAuthResponse(String id, boolean isAdmin, String message, boolean isError) {
        this.id = id;
        this.isAdmin = isAdmin;
        this.message = message;
        this.isError = isError;
    }

    public static UserAuthResponse ok(String id, boolean isAdmin, String message) {
        return new UserAuthResponse(id, isAdmin, message, false);
    }

    public static UserAuthResponse error(String message) {
        return new UserAuthResponse(null, false, message, true);
    }

    public String getId() {
        return id;
    }

    public String getMessage() {
        return message;
    }

    public boolean isError() {
        return isError;
    }

    public boolean isAdmin() {
        return isAdmin;
    }
}
