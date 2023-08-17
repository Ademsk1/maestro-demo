function biometricsFetch(process, phoneType) {
  http.get(`http://0.0.0.0:5173/${phoneType}/${process}`);
}
biometricsFetch(process, phoneType);
