self: super:
{
  cm-backend = super.callPackage ./pkgs/cm-backend { };
  cm-frontend = super.callPackage ./pkgs/cm-frontend { };
}
