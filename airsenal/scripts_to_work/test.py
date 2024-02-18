import argparse
import subprocess
import json
fpl_team_ids = 9884044
fpl_team_id_mes = 3705355
fpl_logins = 'olilewis1@hotmail.co.uk'
fpl_login_mes = 'oliverlewis1331@gmail.com'
fpl_passwords = 'Flynn@2020'
fpl_password_mes = 'Flynn@1992'

def run_airsenal_commands():
    print('hi')
    fpl_team_id = 3705355
    fpl_login = 'oliverlewis1331@gmail.com'
    fpl_password = 'Flynn@1992'

    # Set the environment variables for the Docker command
    env_variables = {
        "FPL_TEAM_ID": str(fpl_team_id),
        "FPL_LOGIN": fpl_login,
        "FPL_PASSWORD": fpl_password,
    }

    # Construct the Docker command
    docker_command = [
        "docker", "run", "-it", "--rm",
        "-v", "airsenal_data:/tmp",
        "--env", f"FPL_TEAM_ID={fpl_team_id}",
        "--env", f"FPL_LOGIN={fpl_login}",
        "--env", f"FPL_PASSWORD={fpl_password}",
        "airsenal",
        "poetry", "run", "airsenal_run_prediction", "--weeks_ahead", "3"
    ]

    print("Running AIrsenal prediction using Docker...")
    try:
        hhi_pthon = subprocess.run(["docker", "run", "-it", "--rm", "-v", "airsenal_data:/tmp", "-e", "FPL_TEAM_ID=3705355", "-e", "FPL_LOGIN=oliverlewis1331@gmail.com", "-e", "FPL_PASSWORD=Flynn@1992", "airsenal", "poetry", "run", "airsenal_run_prediction", "--weeks_ahead", "3"])
        print("AIrsenal prediction executed successfully.", hhi_pthon)
    except subprocess.CalledProcessError as e:
        print(f"Error running AIrsenal prediction: {e}")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")

if __name__ == "__main":
    # Create an argument parser
    parser = argparse.ArgumentParser(description='Automate Commands')

    # Define command-line arguments for login data
    parser.add_argument('--fpl_login', type=str, help='FPL login')
    parser.add_argument('--fpl_password', type=str, help='FPL password')
    parser.add_argument('--fpl_team_id', type=int, help='FPL team ID')

    # Parse the command-line arguments
    args = parser.parse_args()

    # Call the function with parsed arguments
run_airsenal_commands()
