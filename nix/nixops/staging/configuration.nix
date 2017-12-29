{
  network.description = "development";

  campusmedius =
    { config, pkgs, ... }:
    {
        imports =
        [
            ../configuration.nix
        ];
        
        services.campusmedius.backend = {
            CORSAllowAll = true;
            djangoAllowedHosts = ["campusmedius.net" "192.168.56.103"];
        };
        
        #keys
        deployment.keys.sslCertificate.text = builtins.readFile ./keys/nginx.crt;
        deployment.keys.sslCertificateKey.text = builtins.readFile ./keys/nginx.key;
        deployment.keys.basicAuth.text = builtins.readFile ./keys/basicAuth;
        deployment.keys.basicAuth.group = "keys";
        deployment.keys.basicAuth.permissions = "0640";
        deployment.keys.djangoSecret.text = builtins.readFile ./keys/djangoSecret;
        
        networking.hostName = "campusmedius";
    };
} 
