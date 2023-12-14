package com.gitlab.tomaszgryczka.fungiseeker.infrastructure.security;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletRequestWrapper;

import java.util.*;

final class MutableHttpServletRequest extends HttpServletRequestWrapper {

    private final Map<String, String> customHeaders;

    public MutableHttpServletRequest(HttpServletRequest request) {
        super(request);
        this.customHeaders = new HashMap<String, String>();
    }

    public void putHeader(String name, String value) {
        this.customHeaders.put(name, value);
    }

    public String getHeader(String name) {
        String headerValue = customHeaders.get(name);

        if (headerValue != null) {
            return headerValue;
        }
        return ((HttpServletRequest) getRequest()).getHeader(name);
    }

    public Enumeration<String> getHeaders(String name) {
        return this.customHeaders.containsKey(name) ?
                Collections.enumeration(Collections.singletonList(this.customHeaders.get(name))) :
                ((HttpServletRequest) getRequest()).getHeaders(name);
    }

    public Enumeration<String> getHeaderNames() {
        Set<String> set = new HashSet<String>(customHeaders.keySet());

        @SuppressWarnings("unchecked")
        Enumeration<String> e = ((HttpServletRequest) getRequest()).getHeaderNames();
        while (e.hasMoreElements()) {
            String n = e.nextElement();
            set.add(n);
        }

        return Collections.enumeration(set);
    }
}