document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.polaroid');
    const resetBtn = document.getElementById('resetBtn');

    // Lógica do Arraste (Swipe)
    cards.forEach((card) => {
        let startX, startY, moveX, moveY;

        const onMove = (e) => {
            const clientX = e.touches ? e.touches[0].clientX : e.clientX;
            const clientY = e.touches ? e.touches[0].clientY : e.clientY;
            moveX = clientX - startX;
            moveY = clientY - startY;
            
            const rotation = moveX / 10;
            const opacity = 1 - Math.abs(moveX) / 600;

            card.style.transform = `translate(${moveX}px, ${moveY}px) rotate(${rotation}deg)`;
            card.style.opacity = opacity;
        };

        const onEnd = () => {
            document.removeEventListener('mousemove', onMove);
            document.removeEventListener('mouseup', onEnd);
            document.removeEventListener('touchmove', onMove);
            document.removeEventListener('touchend', onEnd);

            if (Math.abs(moveX) > 150) {
                card.style.transition = 'transform 0.5s ease, opacity 0.5s ease';
                card.style.transform = `translate(${moveX * 2}px, ${moveY}px) rotate(${moveX / 5}deg)`;
                card.style.opacity = '0';
                card.style.pointerEvents = 'none';
            } else {
                card.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
                card.style.transform = `translate(0, 0) rotate(0deg)`;
                card.style.opacity = '1';
            }
        };

        card.addEventListener('mousedown', (e) => {
            startX = e.clientX;
            startY = e.clientY;
            card.style.transition = 'none';
            document.addEventListener('mousemove', onMove);
            document.addEventListener('mouseup', onEnd);
        });

        card.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
            card.style.transition = 'none';
            document.addEventListener('touchmove', onMove);
            document.addEventListener('touchend', onEnd);
        });
    });

    // LÓGICA DO BOTÃO VER DE NOVO
    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            cards.forEach((card, index) => {
                setTimeout(() => {
                    card.style.transition = 'all 0.7s cubic-bezier(0.23, 1, 0.32, 1)';
                    card.style.transform = `translate(0, 0) rotate(${index % 2 === 0 ? 2 : -2}deg)`;
                    card.style.opacity = '1';
                    card.style.pointerEvents = 'auto';
                }, index * 100); // Efeito cascata: fotos voltam uma por uma
            });
        });
    }
});