import qrcode
from PIL import Image

def generate_qr_with_logo(link, logo_path, output_path):
    # 1. Initialize the QRCode object
    # We use ERROR_CORRECT_H (High - 30% correction) so the QR code 
    # remains readable even when the logo covers part of it.
    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_H,
        box_size=10,
        border=4,
    )
    
    # Add the URL link to the QR code
    qr.add_data(link)
    qr.make(fit=True)

    # 2. Create the QR code image (with RGB mode to support colored logos)
    qr_img = qr.make_image(fill_color="black", back_color="white").convert('RGB')

    try:
        # 3. Open and resize the logo image
        logo = Image.open(logo_path)
        
        # Calculate the maximum size for the logo (around 20-25% of QR code size)
        qr_width, qr_height = qr_img.size
        logo_max_size = int(qr_width * 0.23)
        
        # Resize logo while maintaining aspect ratio
        logo.thumbnail((logo_max_size, logo_max_size), Image.Resampling.LANCZOS)
        logo_width, logo_height = logo.size

        # 4. Calculate positioning to center the logo
        x_pos = (qr_width - logo_width) // 2
        y_pos = (qr_height - logo_height) // 2

        # 5. Paste the logo onto the QR code
        # If your logo has a transparent background, use logo as the mask: qr_img.paste(logo, (x_pos, y_pos), logo)
        qr_img.paste(logo, (x_pos, y_pos))

    except FileNotFoundError:
        print(f"Warning: Logo file '{logo_path}' not found. Generating QR code without a logo.")

    # 6. Save the final image
    qr_img.save(output_path)
    print(f"QR code successfully saved to {output_path}")

# --- Execution ---
url_link = "https://my-portfolio-sing.vercel.app/"
logo_filename = "https://my-portfolio-sing.vercel.app/assets/logo-portfolio-blue-cyan-BsAhxkVQ.png"  # Path to the logo image you provided
output_filename = "sovisalsing_portfolio_qr_code.png"

generate_qr_with_logo(url_link, logo_filename, output_filename)

# pip install qrcode[pil] pillow
# python -m pip install qrcode[pil] pillow
# py -m pip install qrcode[pil] pillow