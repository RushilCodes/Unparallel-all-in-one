import numpy as np
import matplotlib.pyplot as plt
from matplotlib.patches import Circle

def create_frame(rotation_angle, filename):
    fig, ax = plt.subplots(figsize=(6, 6), dpi=80)
    ax.set_xlim(-1, 1)
    ax.set_ylim(-1, 1)
    ax.set_aspect('equal')
    ax.axis('off')

    # Draw black hole
    black_hole = Circle((0, 0), 0.3, color='black', zorder=10)
    ax.add_patch(black_hole)

    # Draw rotating accretion disk
    num_points = 100
    angles = np.linspace(0, 2 * np.pi, num_points)
    x = 0.6 * np.cos(angles + rotation_angle)
    y = 0.6 * np.sin(angles + rotation_angle)
    
    for i in range(num_points):
        ax.plot([x[i], x[(i + 1) % num_points]], [y[i], y[(i + 1) % num_points]], color='orange', lw=2)

    plt.savefig("./frame/" + filename, bbox_inches='tight', pad_inches=0, dpi=80)
    plt.close(fig)

# Generate frames
num_frames = 60
for i in range(num_frames):
    angle = 2 * np.pi * i / num_frames
    filename = f"frame_{i:03d}.png"
    create_frame(angle, filename)
