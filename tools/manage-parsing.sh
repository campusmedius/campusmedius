#!/usr/bin/env bash

# ARG_POSITIONAL_SINGLE([command],[.])
# ARG_TYPE_GROUP_SET([command],[COMMAND],[command],[env, init, run, deploy, ssh, upgrade, build])
# ARG_POSITIONAL_SINGLE([sub-command],[.])
# ARG_TYPE_GROUP_SET([subcommand],[SUBCOMMAND],[sub-command],[backend, frontend, development, staging, production, deployments])
# ARG_OPTIONAL_SINGLE([terminal],[t],[Terminal to use for 'env develop'],[xterm])
# ARG_OPTIONAL_BOOLEAN([editor],[e],[Start editor in env])
# ARG_DEFAULTS_POS([])
# ARG_HELP([Script to manage environments and delpoyments for campusmedius])
# ARGBASH_GO()
# needed because of Argbash --> m4_ignore([
### START OF CODE GENERATED BY Argbash v2.8.1 one line above ###
# Argbash is a bash code generator used to get arguments parsing right.
# Argbash is FREE SOFTWARE, see https://argbash.io for more info


die()
{
	local _ret=$2
	test -n "$_ret" || _ret=1
	test "$_PRINT_HELP" = yes && print_help >&2
	echo "$1" >&2
	exit ${_ret}
}

# validators

command()
{
	local _allowed=("env" "init" "run" "deploy" "ssh" "upgrade" "build") _seeking="$1"
	for element in "${_allowed[@]}"
	do
		test "$element" = "$_seeking" && echo "$element" && return 0
	done
	die "Value '$_seeking' (of argument '$2') doesn't match the list of allowed values: 'env', 'init', 'run', 'deploy', 'ssh', 'upgrade' and 'build'" 4
}


subcommand()
{
	local _allowed=("backend" "frontend" "development" "staging" "production" "deployments") _seeking="$1"
	for element in "${_allowed[@]}"
	do
		test "$element" = "$_seeking" && echo "$element" && return 0
	done
	die "Value '$_seeking' (of argument '$2') doesn't match the list of allowed values: 'backend', 'frontend', 'development', 'staging', 'production' and 'deployments'" 4
}


begins_with_short_option()
{
	local first_option all_short_options='teh'
	first_option="${1:0:1}"
	test "$all_short_options" = "${all_short_options/$first_option/}" && return 1 || return 0
}

# THE DEFAULTS INITIALIZATION - POSITIONALS
_positionals=()
_arg_command=
_arg_sub_command=
# THE DEFAULTS INITIALIZATION - OPTIONALS
_arg_terminal="xterm"
_arg_editor="off"


print_help()
{
	printf '%s\n' "Script to manage environments and delpoyments for campusmedius"
	printf 'Usage: %s [-t|--terminal <arg>] [-e|--(no-)editor] [-h|--help] <command> <sub-command>\n' "$0"
	printf '\t%s\n' "<command>: .. Can be one of: 'env', 'init', 'run', 'deploy', 'ssh', 'upgrade' and 'build'"
	printf '\t%s\n' "<sub-command>: .. Can be one of: 'backend', 'frontend', 'development', 'staging', 'production' and 'deployments'"
	printf '\t%s\n' "-t, --terminal: Terminal to use for 'env develop' (default: 'xterm')"
	printf '\t%s\n' "-e, --editor, --no-editor: Start editor in env (off by default)"
	printf '\t%s\n' "-h, --help: Prints help"
}


parse_commandline()
{
	_positionals_count=0
	while test $# -gt 0
	do
		_key="$1"
		case "$_key" in
			-t|--terminal)
				test $# -lt 2 && die "Missing value for the optional argument '$_key'." 1
				_arg_terminal="$2"
				shift
				;;
			--terminal=*)
				_arg_terminal="${_key##--terminal=}"
				;;
			-t*)
				_arg_terminal="${_key##-t}"
				;;
			-e|--no-editor|--editor)
				_arg_editor="on"
				test "${1:0:5}" = "--no-" && _arg_editor="off"
				;;
			-e*)
				_arg_editor="on"
				_next="${_key##-e}"
				if test -n "$_next" -a "$_next" != "$_key"
				then
					{ begins_with_short_option "$_next" && shift && set -- "-e" "-${_next}" "$@"; } || die "The short option '$_key' can't be decomposed to ${_key:0:2} and -${_key:2}, because ${_key:0:2} doesn't accept value and '-${_key:2:1}' doesn't correspond to a short option."
				fi
				;;
			-h|--help)
				print_help
				exit 0
				;;
			-h*)
				print_help
				exit 0
				;;
			*)
				_last_positional="$1"
				_positionals+=("$_last_positional")
				_positionals_count=$((_positionals_count + 1))
				;;
		esac
		shift
	done
}


handle_passed_args_count()
{
	local _required_args_string="'command' and 'sub-command'"
	test "${_positionals_count}" -ge 2 || _PRINT_HELP=yes die "FATAL ERROR: Not enough positional arguments - we require exactly 2 (namely: $_required_args_string), but got only ${_positionals_count}." 1
	test "${_positionals_count}" -le 2 || _PRINT_HELP=yes die "FATAL ERROR: There were spurious positional arguments --- we expect exactly 2 (namely: $_required_args_string), but got ${_positionals_count} (the last one was: '${_last_positional}')." 1
}


assign_positional_args()
{
	local _positional_name _shift_for=$1
	_positional_names="_arg_command _arg_sub_command "

	shift "$_shift_for"
	for _positional_name in ${_positional_names}
	do
		test $# -gt 0 || break
		eval "$_positional_name=\${1}" || die "Error during argument parsing, possibly an Argbash bug." 1
		shift
	done
}

parse_commandline "$@"
handle_passed_args_count
assign_positional_args 1 "${_positionals[@]}"

# OTHER STUFF GENERATED BY Argbash
# Validation of values
_arg_command="$(command "$_arg_command" "command")" || exit 1
_arg_sub_command="$(subcommand "$_arg_sub_command" "sub-command")" || exit 1



### END OF CODE GENERATED BY Argbash (sortof) ### ])
# [ <-- needed because of Argbash
# ] <-- needed because of Argbash
