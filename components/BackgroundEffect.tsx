import React, { useEffect, useRef } from 'react';

const BackgroundEffect: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    
    // Mouse state
    const mouse = { x: -1000, y: -1000 };

    // Cấu hình các hạt
    const particles: { x: number; y: number; vx: number; vy: number; baseVx: number; baseVy: number }[] = [];
    const particleCount = window.innerWidth < 768 ? 40 : 80; // Ít hạt hơn trên mobile
    const connectionDistance = 140;
    const mouseDistance = 200;

    for (let i = 0; i < particleCount; i++) {
      const vx = (Math.random() - 0.5) * 0.5;
      const vy = (Math.random() - 0.5) * 0.5;
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: vx,
        vy: vy,
        baseVx: vx,
        baseVy: vy
      });
    }

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const animate = () => {
      ctx.clearRect(0, 0, w, h);
      
      // Vẽ các hạt và đường nối
      particles.forEach((p, i) => {
        // Tương tác với chuột (Physics)
        const dxMouse = mouse.x - p.x;
        const dyMouse = mouse.y - p.y;
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);

        if (distMouse < mouseDistance) {
            // Đẩy nhẹ hạt ra xa chuột hoặc hút nhẹ (tạo hiệu ứng gợn sóng)
            const forceDirectionX = dxMouse / distMouse;
            const forceDirectionY = dyMouse / distMouse;
            const force = (mouseDistance - distMouse) / mouseDistance;
            
            // Effect: Gentle push away
            const direction = -1; 
            const strength = 2;

            p.vx = p.baseVx + (forceDirectionX * force * direction * strength);
            p.vy = p.baseVy + (forceDirectionY * force * direction * strength);
        } else {
            // Return to normal speed slowly
            p.vx += (p.baseVx - p.vx) * 0.05;
            p.vy += (p.baseVy - p.vy) * 0.05;
        }

        p.x += p.vx;
        p.y += p.vy;

        // Dội ngược khi chạm biên
        if (p.x < 0 || p.x > w) { p.vx *= -1; p.baseVx *= -1; }
        if (p.y < 0 || p.y > h) { p.vy *= -1; p.baseVy *= -1; }

        // Vẽ điểm tròn
        ctx.beginPath();
        ctx.arc(p.x, p.y, distMouse < mouseDistance ? 3 : 2, 0, Math.PI * 2);
        // Highlight hạt gần chuột màu cyan
        ctx.fillStyle = distMouse < mouseDistance ? 'rgba(6, 182, 212, 0.6)' : 'rgba(156, 163, 175, 0.3)';
        ctx.fill();

        // Vẽ đường nối các hạt với nhau
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDistance) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            const opacity = 1 - dist / connectionDistance;
            ctx.strokeStyle = `rgba(165, 180, 252, ${opacity * 0.4})`; // Indigo soft connection
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }

        // Vẽ đường nối hạt với chuột (Tech connection)
        if (distMouse < connectionDistance) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouse.x, mouse.y);
            const opacity = 1 - distMouse / connectionDistance;
            ctx.strokeStyle = `rgba(139, 92, 246, ${opacity * 0.5})`; // Violet connection to mouse
            ctx.lineWidth = 1;
            ctx.stroke();
        }
      });

      requestAnimationFrame(animate);
    };

    const handleResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', onMouseMove);
    animate();

    return () => {
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
    />
  );
};

export default BackgroundEffect;