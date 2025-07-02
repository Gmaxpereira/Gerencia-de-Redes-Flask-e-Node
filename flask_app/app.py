from flask import Flask, request, jsonify
import subprocess

app = Flask(__name__)

@app.route('/execute_python_code', methods=['POST'])
def execute_python_code():
    data = request.get_json()
    if not data or 'code' not in data:
        return jsonify({"error": "Nenhum código Python fornecido."}), 400

    python_code = data['code']
    filename = "temp_script.py"

    try:
        with open(filename, "w") as f:
            f.write(python_code)

        result = subprocess.run(
            ["python", filename],
            capture_output=True,
            text=True,
            check=True 
        )
        output = result.stdout
        error = result.stderr
        status = "success"

    except subprocess.CalledProcessError as e:
        output = e.stdout
        error = e.stderr
        status = "error"
    except Exception as e:
        output = ""
        error = str(e)
        status = "error"
    finally:
        import os
        if os.path.exists(filename):
            os.remove(filename)

    return jsonify({
        "status": status,
        "output": output,
        "error": error
    })

if __name__ == '__main__':
    app.run(debug=True, port=5000) 