import os

base_path = r'c:\ERP_Equipamec\site_institucional\assets'
target_folders = ['CH1S', 'CH2S', 'CH3SD', 'CHE2S', 'camc30', 'hpj40', 'hpj41', 'hpj25', 'mangote', 'escovas', 'videos']

for folder in target_folders:
    folder_path = os.path.join(base_path, folder)
    if not os.path.isdir(folder_path):
        continue
        
    files = [f for f in os.listdir(folder_path) if os.path.isfile(os.path.join(folder_path, f))]
    
    # Simple trick to avoid conflicts if re-running: rename to a temp name first
    # So we don't accidentally overwrite if a file is already "hpj40_1.png"
    temp_names = []
    for i, file in enumerate(files):
        ext = os.path.splitext(file)[1].lower()
        old_path = os.path.join(folder_path, file)
        temp_path = os.path.join(folder_path, f"TEMP_{i}{ext}")
        os.rename(old_path, temp_path)
        temp_names.append((temp_path, ext))
        
    # Now rename temp to final standardized names
    for i, (temp_path, ext) in enumerate(temp_names, start=1):
        final_name = f"{folder.lower()}_{i}{ext}"
        final_path = os.path.join(folder_path, final_name)
        os.rename(temp_path, final_path)
        print(f"Renamed -> {folder}/{final_name}")

print("All gallery images renamed successfully.")
